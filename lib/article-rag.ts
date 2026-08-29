export const ragArticle = {
  slug: "rag-from-scratch-beyond-the-vector-database",
  title: "RAG From Scratch: Beyond the Vector Database",
  subtitle: "An 18-part mental model for indexing, query translation, routing, retrieval, self-correction, and the long-context future of RAG.",
  date: "Aug 2026",
  readingTime: "38 min read",
  tags: ["AI", "RAG", "LLMs", "LangChain", "System Design"],
  excerpt:
    "RAG is not just chunking text and searching a vector database. This deep dive rebuilds the entire pipeline—from embeddings and query transformation to RAPTOR, ColBERT, corrective RAG, and long-context trade-offs.",
  content: `The first time I built retrieval-augmented generation, the architecture in my head was almost comically small:

> Put documents in a vector database. Find a few similar chunks. Send them to an LLM.

That description is not wrong. It is simply the first four parts of a much larger system.

Lance Martin's [RAG From Scratch course](https://www.youtube.com/watch?v=sVcwVQRHIc8), published through freeCodeCamp with a complete [companion repository](https://github.com/langchain-ai/rag-from-scratch), starts with that minimal pipeline and then keeps asking the questions a real application eventually forces us to answer.

What if the user's wording is bad for retrieval? What if the question contains several questions? What if the answer requires evidence spread across many documents? What if the vector store is the wrong source? What if retrieval returns irrelevant evidence? What if the answer is fluent but unsupported? And if an LLM can now accept an entire book, do we need retrieval at all?

The course answers those questions across 18 parts. The result is not one magic RAG architecture. It is a toolbox for reasoning about the failure point in front of you.

**RAG is better understood as evidence engineering: deciding what information the model should see, how to find it, how to test it, and what to do when the evidence is not good enough.**

One note before we begin: the notebooks were recorded in early 2024. Exact model names, LangChain imports, and method names have evolved. I preserve the implementation details because they make the ideas concrete, but this is an architectural guide, not a promise that every historical snippet can be pasted unchanged into the latest package version.

## Why RAG exists

An LLM learns from a large but fixed training corpus. That gives it broad parametric knowledge, but it creates two hard boundaries: the model does not automatically know information created after training, and it does not automatically know private information that never belonged in its training set.

Fine-tuning can change how a model behaves, but it is often an awkward and expensive mechanism for factual recall. If the facts change, the weights must change again. The source of an answer is also difficult to inspect. RAG takes a different route: leave the model weights alone and provide relevant external information at inference time through in-context learning.

The course frames LLMs as the reasoning center of a new kind of operating system. In that picture, the model is not the whole computer. Search indexes, private data, APIs, databases, and tools are peripherals that bring the right state into the model's context.

That produces a simple contract:

1. Make external knowledge retrievable.
2. Retrieve evidence relevant to the input.
3. place that evidence in the model's context.
4. Ask the model to reason from the evidence.

The first three steps determine what the model is allowed to know for this request. Generation can only be as grounded as the context it receives.

[[diagram:rag-pipeline]]

The upper lane happens ahead of the user's question. The lower lane happens when the question arrives. Confusing those two lifecycles makes RAG systems harder to operate: indexing has freshness, lineage, and storage concerns, while online retrieval has latency, relevance, and answer-quality concerns.

## Parts 1–4: build the smallest complete RAG system

The tutorial's quick start uses one source throughout: Lilian Weng's article about LLM-powered autonomous agents. It loads the page, keeps only the title/header/content elements with Beautiful Soup, splits the content, embeds the splits with OpenAI embeddings, and stores them in a local Chroma vector store. The retriever feeds a public RAG prompt, a temperature-zero chat model generates the answer, and a string parser returns plain text.

In LangChain Expression Language, or LCEL, the compact version looked conceptually like this:

[[code:python — the original LCEL shape]]
rag_chain = (
    {
        "context": retriever | format_docs,
        "question": RunnablePassthrough(),
    }
    | prompt
    | llm
    | StrOutputParser()
)

answer = rag_chain.invoke("What is task decomposition?")
[[/code]]

The pipe syntax hides a useful dataflow. The question enters both branches. One branch sends it through the retriever and formats the returned documents; the other preserves the original question. The resulting dictionary fills the prompt's \`context\` and \`question\` variables, then flows through the model and parser.

LCEL chains share invocation patterns such as \`invoke\`, \`batch\`, and \`stream\`. That common interface matters later: a retriever, prompt, model, parser, query generator, or custom function can be composed without inventing a new orchestration convention for each stage.

### Indexing begins with tokens, not characters

Models do not read characters or words directly. They read tokens. The tutorial uses \`tiktoken\` to count them and mentions the rough English heuristic of about four characters per token. It is only a heuristic; punctuation, code, whitespace, and language can change the ratio substantially.

Why count tokens here? Both embedding models and generative LLMs have bounded context windows. At the time of the recording, the tutorial describes embedding windows ranging from roughly 512 tokens to several thousand. A document that does not fit must be divided before it can be embedded, and the resulting chunks must later fit inside the generation model alongside the question, instructions, and any chat history.

The quick start initially uses chunks of 1,000 characters with 200 characters of overlap. The deeper walkthrough uses a token-aware recursive splitter with a chunk size of 300 and an overlap of 50. Those numbers are demonstrations, not universal constants.

The recursive character splitter tries separators in order—paragraph breaks, line breaks, spaces, then individual characters—until the piece is small enough. This preserves the strongest likely semantic boundaries for as long as possible. Overlap reduces the chance that a fact and the words needed to interpret it land on opposite sides of a hard boundary, but overlap also creates duplicate storage and can return near-identical evidence.

Chunking is therefore a trade-off:

- Too large, and one embedding compresses several unrelated ideas while each retrieved item consumes more context.
- Too small, and chunks lose the surrounding meaning needed to answer accurately.
- Too little overlap, and boundary-spanning facts break apart.
- Too much overlap, and retrieval wastes its top-k slots on duplicates.

The course deliberately does not present a universal chunking recipe. It points to Greg Kamradt's [chunking deep dive](https://www.youtube.com/watch?v=8OJC21T2SL4), because chunk structure should follow the documents, queries, and evaluation set of the actual system.

### Embeddings turn text into searchable geometry

An embedding model maps variable-length text to a fixed-length numerical vector. In the notebook's historical OpenAI example, both the tiny question and document become vectors with 1,536 dimensions. The length stays fixed even when the input length changes; the numbers encode a learned semantic representation of the input.

The tutorial demonstrates this with:

- Question: “What kinds of pets do I like?”
- Document: “My favorite pet is a cat.”

Both are embedded with the same model. Their similarity is then computed with cosine similarity:

> cosine(q, d) = (q · d) / (||q|| ||d||)

For the normalized embeddings used in the example, a value closer to 1 means more similar. The important rule is symmetry of representation: documents and questions must be embedded into the same vector space by a compatible model.

When a split is indexed, the vector store keeps its embedding and a reference to the original text and metadata. At query time, the question is embedded, compared against indexed vectors, and the nearest items are returned. In the toy three-dimensional diagram from the course, semantically similar documents occupy nearby points. Real embeddings simply do this in far more dimensions.

This is semantic retrieval: “feline companion” may find “favorite pet is a cat” even without exact keyword overlap. It is powerful, but it is not an oracle. Similarity is influenced by the embedding model, the chunk, the query wording, the corpus, filters, and the number of neighbors requested.

### Retrieval is a policy, not just a database call

The notebook turns Chroma into a retriever and sets \`k=1\` for the smallest demonstration. That means “return one nearest split,” not “return everything relevant.” A larger k can improve recall but consumes more tokens and introduces more distracting context. A smaller k is cheaper and more precise but can omit a necessary fact.

The abstraction is intentionally modular. Document loaders, text splitters, embedding models, vector stores, and retrieval strategies can be exchanged independently. That makes experimentation possible, but it also means the word “retriever” hides policy decisions that deserve evaluation.

At minimum, measure whether the required evidence appears in the retrieved set before blaming the generator. If the supporting document never enters the context window, prompt tuning the answer model cannot recover it reliably.

### Generation is prompt assembly

After retrieval, the returned documents are stuffed into the generation model's context. The basic prompt is deliberately plain:

> Answer the question based only on the following context: {context} Question: {question}

The \`context\` and \`question\` names are placeholders. A dictionary supplies their values. The prompt becomes chat messages, the messages go to the LLM, and the output parser extracts the answer string.

The tutorial first invokes this manually with a known document list, then composes retrieval into the chain so one question triggers the entire flow. LangSmith tracing exposes every intermediate object: the input question, retriever call, returned documents, final populated prompt, model output, timing, and token usage. That observability stops being optional once the pipeline becomes cyclic.

The baseline is now complete. The rest of the course asks where it fails.

## Parts 5–9: translate the query before searching

A vector store does not retrieve “what the user meant.” It retrieves items close to the vector created from the words the user supplied. Ambiguous, compound, overly specific, or poorly phrased questions can land in the wrong semantic neighborhood.

Query translation uses an LLM before retrieval to create a representation better suited to search. The course covers five distinct strategies.

[[diagram:query-toolbox]]

These techniques are not interchangeable decorations. Each targets a different mismatch between the question and the index.

### Part 5: Multi-query widens recall

Multi-query asks an LLM for five alternative versions of the original question, each expressing a different perspective. Every version runs against the same retriever. The nested results are flattened, documents are serialized so duplicates can be identified, and a unique union becomes the context for generation.

The logic is small:

[[code:pseudocode — multi-query]]
queries = rewrite_from_five_perspectives(question)
ranked_lists = [retrieve(query) for query in queries]
context = unique_union(flatten(ranked_lists))
answer = generate(question, context)
[[/code]]

This helps when one phrasing misses a relevant region of the embedding space. Its cost is equally clear: five queries mean multiple retrievals, and the union can become large or noisy. Deduplication prevents exact duplicates, not semantically redundant chunks.

### Part 6: RAG-Fusion adds ranking back

Multi-query treats every unique result as a member of a set. RAG-Fusion also creates multiple related queries—four in the notebook—but preserves the rank each result received and merges those rankings with reciprocal rank fusion.

For every document d returned by several result lists, the notebook computes:

> RRF(d) = Σ 1 / (rank(d) + k)

The example uses \`k=60\`. This k is a rank-smoothing constant, not the top-k retrieval count from the previous section. A document that appears near the top of several lists accumulates more score than a document that appears once near the bottom. RRF is attractive because it does not require incomparable raw similarity scores from different searches to be calibrated.

After sorting by the fused score, the ranked documents feed the same generation prompt. The architecture stays modular: query generation changes, retrieval maps over the queries, and a pure function fuses the output.

The tutorial returns to RAG-Fusion in Part 15 as a first form of re-ranking. The broader lesson is that candidate generation and candidate ordering are separate problems.

### Part 7: Decomposition handles compound reasoning

A question such as “What are the main components of an LLM-powered autonomous agent system?” may require several independently retrievable ideas. Decomposition asks the model to turn one question into three sub-questions that can be answered in isolation.

The course demonstrates two answer patterns.

The recursive pattern answers sub-question one, formats that question-answer pair, and gives it to the prompt for sub-question two. The accumulated background grows with every step. This is useful when later sub-questions depend on earlier answers, but it is sequential and an early error can contaminate everything after it.

The independent pattern retrieves and answers each sub-question separately, then gives the set of question-answer pairs to a final synthesis prompt. Those branches can run in parallel and do not inherit one another's mistakes, but the final synthesizer must resolve any disagreement and reconstruct the relationships between them.

Choosing between them requires looking at dependency structure:

- Use recursive answering when sub-problem B genuinely needs the result of A.
- Use independent answering when sub-problems can be solved in isolation.
- Use a dependency graph when the real question mixes both patterns.

Decomposition improves coverage, but it can invent the wrong sub-problems. The sub-question generator itself needs examples and evaluation.

### Part 8: Step-back prompting retrieves the principle

Some questions are too narrow. A literal search may find details but miss the background rule needed to reason about them. Step-back prompting asks a more general question first.

The tutorial teaches the transformation with few-shot examples. A question about whether members of the band The Police could perform lawful arrests steps back to what those members can do. A question about Jan Šindel's country of birth steps back to the person's history.

For RAG, the chain retrieves twice:

1. Retrieve with the original question for direct evidence.
2. Generate a broader step-back question and retrieve background evidence.

The response prompt receives \`normal_context\`, \`step_back_context\`, and the original question. It explicitly says the answer should be comprehensive without being contradicted by relevant context and should ignore irrelevant context. That last instruction matters: broad questions can retrieve generally related but useless material.

Step-back prompting is a useful complement to decomposition. Decomposition moves downward into smaller pieces; step-back moves upward into a more abstract principle.

### Part 9: HyDE searches with an imagined answer

HyDE means Hypothetical Document Embeddings. Instead of embedding the short question, the LLM first writes a hypothetical passage that looks like the kind of document that would answer it. The tutorial prompts for a scientific-paper passage, embeds that passage, and retrieves real documents near it.

This works because queries and answer passages have different shapes. A generated pseudo-document can contain the vocabulary, structure, and conceptual density of the indexed documents, giving the retriever a better semantic anchor.

The hypothetical document does not need to be factually correct. It is not presented as evidence and should not be copied into the answer. Its purpose is retrieval. Real retrieved documents still ground generation.

The prompt can be tuned for the domain: generate a legal clause, support ticket, API documentation paragraph, medical abstract, or product description depending on the corpus. The failure mode is query drift—if the hypothetical answer confidently imagines the wrong concept, retrieval can follow it.

## Parts 10–11: route to the right source and construct its query

Once the question has a useful form, the next question is where it should go. A production knowledge system rarely contains only one undifferentiated vector index. It may have Python docs, JavaScript docs, a graph, a relational database, an internal corpus, live web search, and an LLM-only fallback.

### Part 10: Logical routing with structured output

The logical router defines a schema whose \`datasource\` must be one of \`python_docs\`, \`js_docs\`, or \`golang_docs\`. A temperature-zero chat model receives a system instruction to identify the language referenced by the question and returns an object matching that schema through function calling.

A normal branch then inspects \`result.datasource\` and chooses the corresponding chain. The important detail is not those three toy labels. It is constraining a probabilistic model to a small machine-readable decision surface. Free-form prose such as “I think the Python documentation would be best” is inconvenient and brittle for control flow; an enumerated structured field is inspectable and testable.

The router must know enough about each source to distinguish them. Descriptions are part of the retrieval system, not harmless comments.

### Semantic routing compares the query with prompts

The second routing method does not ask an LLM to classify explicitly. The notebook defines a physics prompt and a mathematics prompt, embeds both templates, embeds the incoming query, computes cosine similarity, and selects the prompt with the highest score.

This is semantic routing: the destinations themselves have vector representations. It can be simple and fast when routes are naturally separated by meaning. Logical routing is preferable when decisions depend on explicit business rules, capabilities, or metadata that semantic proximity cannot express cleanly.

### Part 11: Query construction turns language into a database operation

Routing selects a source. Query construction speaks that source's language.

The tutorial uses a YouTube transcript database to demonstrate self-querying. It assumes unstructured search over transcript content and title, plus range filtering over view count, publication date, and video length. A Pydantic schema describes:

- \`content_search\`: a semantic query for transcripts.
- \`title_search\`: a short keyword-oriented title query.
- inclusive minimum and exclusive maximum view counts.
- inclusive earliest and exclusive latest publication dates.
- inclusive minimum and exclusive maximum durations in seconds.

The field descriptions say that filters should be used only when the user explicitly requests them. This prevents the model from inventing constraints. “Videos on chat LangChain published in 2023” should populate text fields and date bounds; “multimodal agents under five minutes” should also produce a maximum length of 300 seconds.

The same pattern generalizes beyond vector metadata filters. Natural language can be translated into SQL for relational databases, Cypher for graph databases, or another domain-specific query language. At that point, validation, authorization, query complexity, and safe execution become part of RAG design. The model should construct an allowed query, not receive unrestricted database power.

## Parts 12–14: improve what the index represents

Query transformation improves the input side. Advanced indexing improves the corpus side. The baseline compresses each chunk into one vector and returns the same chunk if it matches. The next three techniques deliberately break that one-to-one assumption.

[[diagram:indexing-strategies]]

### Part 12: Multi-representation indexing separates search from generation

The Dense X Retrieval idea highlighted in the course turns a raw split into a cleaner proposition optimized for retrieval. The notebook generalizes this with summaries.

It loads two full blog posts, generates a summary of each with a batch call and a maximum concurrency of five, and creates a UUID for every original document. Summary documents carry the UUID in a \`doc_id\` metadata field and go into Chroma. Full original documents, keyed by the same IDs, go into an in-memory byte store.

The \`MultiVectorRetriever\` joins both stores:

[[code:pseudocode — retrieve one representation, return another]]
summary_hits = vector_store.similarity_search(question)
parent_ids = [hit.metadata["doc_id"] for hit in summary_hits]
full_documents = document_store.mget(parent_ids)
[[/code]]

A query about memory in agents matches the compact agent summary, but the retriever returns the entire original article for generation. This is valuable when the summary is a better search target and a long-context model can use the full document without losing its surrounding argument.

The parent-document retriever is a related variation: index smaller child chunks for precise search, then return their larger parent sections or documents. The general principle is more important than the exact representation. **Search the thing that is easiest to match; return the thing that is best to reason over.**

This design needs stable parent IDs, deduplication when several children point to one parent, and a context budget for the much larger returned documents.

### Part 13: RAPTOR builds an abstraction tree

Flat top-k retrieval struggles with questions that require information across more chunks than k permits. If k is three but the answer depends on six distant passages, no generator can reconstruct the missing half.

RAPTOR—Recursive Abstractive Processing for Tree-Organized Retrieval—creates information at several levels of abstraction:

1. Treat raw chunks or whole documents as leaves.
2. Embed and cluster semantically related leaves.
3. Summarize each cluster.
4. Embed and cluster those summaries again.
5. Repeat until a stopping rule or a high-level root summary is reached.
6. Collapse leaves and summaries from every level into one searchable pool.

A detail question can match a leaf. A corpus-level comparison can match a cluster summary that already consolidates several sources. Retrieval therefore spans an abstraction hierarchy rather than forcing every question to match the same chunk granularity.

The course's walkthrough applies this to roughly 30 LangChain Expression Language documents. Most are under about 4,000 tokens. It embeds, clusters, summarizes recursively for a limited number of levels—three in the shown run—appends all generated summaries to the raw texts, and indexes the combined set. It experiments with both Anthropic and OpenAI models in the supporting implementation.

RAPTOR moves work and cost into indexing. Summaries can lose detail or introduce error, and corpus updates may require rebuilding affected branches. But it directly addresses multi-document questions that a flat nearest-neighbor search represents poorly.

### Part 14: ColBERT keeps token-level meaning

A single dense embedding is aggressive compression. A long passage containing many entities, qualifications, and relationships becomes one point. ColBERT uses late interaction to preserve finer structure.

It creates a contextualized vector for every query token and every document token. For each query-token vector, it finds the maximum similarity with any document-token vector. The document score is the sum of those maxima:

> score(q, d) = Σᵢ maxⱼ similarity(qᵢ, dⱼ)

The document representations can be computed and indexed offline. At query time, token-level interactions retain more nuance than comparing one query vector with one document vector.

The notebook uses RAGatouille and the pretrained \`colbert-ir/colbertv2.0\` model. It downloads the full Wikipedia article for Hayao Miyazaki, creates an index with a maximum document length of 180 and document splitting enabled, then asks which animation studio Miyazaki founded with \`k=3\`. RAGatouille can expose the result as a normal LangChain retriever, so downstream prompts, models, and re-rankers do not need to know which retrieval algorithm produced the documents.

The tutorial flags latency and production readiness as questions to test. Token-level vectors require more storage and interaction work. ColBERT is not “better embeddings” in the abstract; it is a different quality-cost trade-off.

## Part 15: retrieve broadly, then re-rank precisely

Initial retrieval should be fast enough to search the corpus. Final ranking should be accurate enough to spend the limited context budget on the best evidence. Those goals often favor different models.

RAG-Fusion already re-ranks by combining multiple ranked lists. The course then shows a dedicated cross-encoder-style reranker through Cohere. The base Chroma retriever first returns ten candidates. \`CohereRerank\` scores those candidates against the question, and a contextual compression retriever exposes the smaller, reordered result set.

This two-stage shape is common:

1. A cheap retriever maximizes candidate recall over the large corpus.
2. A more expensive reranker evaluates only that small candidate set.
3. The generator receives the highest-value evidence.

“Compression” here does not necessarily mean summarizing the text. It means compressing the retrieved set by dropping or reordering low-value documents.

Re-ranking cannot recover a document absent from the candidate set. Evaluate recall before the reranker and precision after it.

## Parts 16–17: make RAG inspect and correct itself

The baseline is a straight line. A question always retrieves, every retrieved document is trusted, and every generation is returned. Real systems need decisions:

- Is retrieval necessary for this question?
- Is this the right data source?
- Are the retrieved documents relevant?
- Is the answer supported by those documents?
- Does the supported answer actually address the question?
- If a check fails, what recovery path is allowed?

This is active or adaptive RAG. The LLM does not merely choose the text for one step; it helps choose the next step inside an explicitly constrained state machine.

[[diagram:adaptive-rag]]

### Part 16: Corrective RAG adds a retrieval fallback

The CRAG paper introduces a lightweight retrieval evaluator, confidence-based actions, web search as an external extension, and a decompose-then-recompose knowledge-refinement step. The tutorial implements a simplified version to make the control flow visible.

It indexes three blog posts in Chroma with OpenAI embeddings and defines a graph state dictionary containing \`question\`, \`documents\`, and \`generation\`, plus flags created during execution. Every node is a function that receives state and returns updates.

The graph does the following:

1. Retrieve documents from the vector store.
2. Grade every document for relevance with a structured yes/no output.
3. Filter irrelevant documents.
4. If any document was judged irrelevant in this demonstration, set a web-search flag.
5. Rewrite the question for search.
6. Search the web with Tavily and append the result to the remaining context.
7. Generate an answer from the combined evidence.

That “any irrelevant document triggers supplementation” rule is intentionally more aggressive than the paper's threshold-based decision. The knowledge-refinement stage is also omitted. Calling out those differences matters: an educational implementation inspired by a paper is not identical to the paper.

LangGraph models state changes as nodes and decisions as conditional edges. Retrieval always flows to grading. Grading chooses web search or generation. Query transformation flows to web search, and web search flows to generation. Drawing that graph before writing functions is what the tutorial calls **flow engineering**.

In the traced example, one retrieved chunk is marked irrelevant, the original question about an artificial agent's memory system is slightly rewritten, a web result is appended, and generation uses both the remaining local chunks and the external result. LangSmith exposes the output of every individual grader, rewrite, search result, populated prompt, and final answer.

### Part 17: self-reflection and adaptive routing

Self-RAG's research contribution trains a model to retrieve, generate, and critique using special reflection tokens. The tutorial's practical LangGraph interpretation implements the broader behavior as separate components: relevance grading, hallucination grading, answer grading, rewriting, and retries. They share the principle of making retrieval and reflection conditional rather than retrieving a fixed number of passages every time.

The course then combines query analysis with online checks in an adaptive graph. Its initial router chooses among three paths:

- **Vector store** for indexed topics such as agents, prompt engineering, and adversarial attacks.
- **Web search** for current or out-of-domain factual questions.
- **LLM fallback** for casual requests that need neither source.

The demonstration uses Cohere Command R, then a 35-billion-parameter model with a 120,000-token context window, because it was fast, open-weight, tuned for RAG, and capable of tool use and query writing. The router binds two tools—web search and vector retrieval—and its preamble explicitly describes what the vector index contains. No tool call means use the LLM fallback.

Three graders return constrained binary objects:

1. **Retrieval grader:** Is this document relevant to the question?
2. **Hallucination grader:** Is the generation grounded in the supplied facts?
3. **Answer grader:** Does the grounded generation answer the original question?

Those checks create different recovery edges. Irrelevant local documents lead to web search. An ungrounded generation leads to regeneration. A grounded but unhelpful answer broadens retrieval through web search. A useful grounded answer ends the graph.

The course tests all three routes. A question about the Chicago Bears' draft goes to live web search. A question about types of agent memory goes to the vector store, passes document grading, generates, and passes both answer checks. “Hi, how are you?” uses the direct LLM fallback. The shown traced runs take roughly one second for the fallback and around six or seven seconds for the checked graph, though those historical numbers depend completely on model, provider, network, and workload.

The comparison with open-ended agents is thoughtful. Agents choose actions with more freedom and are useful for long-horizon planning, but that freedom can reduce reproducibility. A graph enumerates allowed transitions and can run reliably with smaller, faster models. The decision is not graph versus agent as ideology. It is constrained, observable workflow versus open-ended planning for the problem at hand.

Production loops need termination conditions. A system that regenerates forever is not self-correcting; it is stuck. Bound retries, track why each edge was taken, and define a safe final response when evidence remains insufficient.

## Part 18: do long context windows make RAG obsolete?

The final section begins with the uncomfortable question. Context windows grew from a few thousand tokens to hundreds of thousands and then a million. If an entire corpus fits in the prompt, why build retrieval?

The course pressure-tests the assumption with a multi-needle experiment. Several small facts—the “needles”—are placed at different positions inside a long haystack of Paul Graham essays. The model must recover one, three, or ten needles from a 120,000-token context. A harder version also requires a tiny reasoning operation over the recovered facts rather than merely repeating them.

Across nine GPT-4 trials shown in the talk, three patterns emerge:

1. Recovering more facts is harder than recovering one.
2. Recovering facts and reasoning over them is harder than retrieval alone.
3. Facts near the beginning of a long context are missed more often than facts near the end.

The third effect is consistent with recency bias: tokens closer to the generation point can receive more useful attention. The talk compares it to reading a book and being asked about the first chapter after reaching the end.

Needle-in-a-haystack benchmarks can also be deceptively easy. A single synthetic fact may be stylistically obvious against unrelated essays, and repeating it requires no multi-document reasoning. When the needle resembles its background, when several facts must be combined, or when reasoning is required, performance drops.

The conclusion is not that long context is useless. It is that **capacity is not a retrieval guarantee**.

[[diagram:long-context]]

At one extreme, precise chunk RAG can be over-engineered. Chunk size, overlap, embedding model, top-k, filtering, and post-processing interact; retrieving only a few tiny chunks can lower recall.

At the other extreme, stuffing everything into every prompt creates high token cost and latency. In the historical pricing example from the talk, a 100,000-token GPT-4 generation was on the order of a dollar. Prices change; the scaling fact remains. Context stuffing is also difficult to audit and complicates authorization—different users may not be allowed to see every document included in a giant prompt.

The likely middle is more document-centric RAG. Route the question to the right database and perhaps the right whole document, then let a long-context model reason over coherent source material. Multi-representation indexing fits this future: search a summary, return the full parent. RAPTOR fits it too: preserve summaries at several abstraction levels. Long-context embedding models make whole-document representations more practical.

Structured sources still need query construction. No sensible system dumps an entire SQL database into a prompt instead of executing a scoped SQL query. Graph queries, metadata filters, permissions, and freshness remain retrieval concerns regardless of model context length.

Long context may reduce our obsession with tiny arbitrary chunks. It does not remove:

- routing to the correct source;
- constructing a safe query;
- enforcing document-level authorization;
- keeping private data outside unrelated prompts;
- tracing which evidence supported an answer;
- controlling latency and token cost;
- detecting irrelevant evidence and unsupported generations.

RAG is not dead. The unit of retrieval and the amount of downstream reasoning are changing.

## The complete mental model

The most valuable part of the course is how every technique occupies a specific location in the pipeline.

### Before retrieval

Improve the question with multi-query, decomposition, step-back prompting, or HyDE. Route it to the right source. Construct a query or metadata filter that source can safely execute.

### During indexing

Choose loaders and preserve metadata. Split according to the document and evaluation needs. Select an embedding model. Consider searching summaries or propositions while returning parents, building a RAPTOR hierarchy, or using token-level late interaction with ColBERT.

### During retrieval

Choose candidate count and search strategy. Retrieve broadly enough to preserve recall. Fuse multiple ranked lists or rerank candidates with a more precise model. Enforce access control before context assembly.

### During generation

Format evidence with clear boundaries and provenance. Ask the model to answer from that evidence and to admit when it is insufficient. Keep the original question distinct from rewritten retrieval queries.

### After retrieval and generation

Grade document relevance, factual grounding, and answer usefulness. Route failures to explicit recovery paths: rewrite, search elsewhere, regenerate, or stop with an honest insufficiency response. Trace the entire state transition history.

That framing also tells us how to debug.

- If the source contains the answer but no returned document does, debug indexing and retrieval.
- If the right document ranks too low, debug query translation, candidate count, and reranking.
- If the context has the answer but the response does not, debug prompt assembly and generation.
- If the response claims something absent from context, debug grounding checks and fallback behavior.
- If the right source was never queried, debug routing and source descriptions.
- If latency is unacceptable, inspect fan-out, reranking depth, model choice, context size, and retry count.

**“RAG quality” is not one metric because RAG is not one step.**

## What I would build first

The course contains many sophisticated techniques, but it does not imply that every application needs all of them. Complexity should be earned by observed failure.

I would begin with a well-instrumented baseline:

1. Clean documents with useful metadata and stable source IDs.
2. A defensible chunking strategy with measured retrieval recall.
3. One embedding model and a simple vector or hybrid retriever.
4. A grounded prompt that preserves source provenance.
5. Traces for the query, returned documents, final context, answer, latency, and cost.
6. An evaluation set built from real questions and known supporting evidence.

Then I would add the smallest technique that addresses a measured error:

- Missing synonyms or alternate phrasings → multi-query.
- Good candidates in the wrong order → reranking or RAG-Fusion.
- Compound questions → decomposition.
- Questions missing broader context → step-back prompting.
- Query/document vocabulary mismatch → HyDE.
- Multiple corpora or live sources → routing.
- Metadata-rich or structured data → query construction.
- Tiny chunks retrieve well but lack context → parent or multi-representation retrieval.
- Corpus-level synthesis → RAPTOR.
- Dense single-vector compression loses fine detail → consider ColBERT.
- Irrelevant retrieval → a relevance grader and fallback.
- Unsupported answers → grounding checks.
- Out-of-domain questions → web search or an explicit no-evidence response.

Every added model call increases latency, cost, and another chance for nondeterminism. Every retry loop needs a budget. Every external search changes the trust boundary. Every generated summary becomes derived data whose lineage should be preserved.

The advanced architecture is valuable because it gives us options, not because complexity itself is intelligence.

## What stayed with me

I started the tutorial thinking a vector database was the center of RAG.

It is not.

The center is the decision about evidence. Embeddings, vector stores, rerankers, routers, query writers, graders, and graphs are different mechanisms for improving that decision.

A naive RAG chain asks an LLM to answer with whatever a single similarity search happened to return. A mature RAG system knows which source to consult, can reshape a poor question, preserves the right granularity of context, distinguishes retrieval from ranking, checks its own evidence, and has a defined response when the evidence fails.

That is why the phrase “from scratch” fits this course so well. It does not merely reconstruct a popular code snippet. It reconstructs the reasoning that turns retrieval into a system.

**The goal is not to give the model more context. The goal is to give it the right context—and know why it was right.**

## Sources and further study

- [Learn RAG From Scratch — full freeCodeCamp course](https://www.youtube.com/watch?v=sVcwVQRHIc8)
- [LangChain RAG From Scratch notebooks](https://github.com/langchain-ai/rag-from-scratch)
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [Least-to-Most Prompting Enables Complex Reasoning](https://arxiv.org/abs/2205.10625)
- [Decomposed Prompting: A Modular Approach for Solving Complex Tasks](https://arxiv.org/abs/2210.02406)
- [Take a Step Back: Evoking Reasoning via Abstraction](https://arxiv.org/abs/2310.06117)
- [Precise Zero-Shot Dense Retrieval without Relevance Labels — HyDE](https://arxiv.org/abs/2212.10496)
- [Dense X Retrieval: What Retrieval Granularity Should We Use?](https://arxiv.org/abs/2312.06648)
- [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](https://arxiv.org/abs/2401.18059)
- [ColBERT: Contextualized Late Interaction over BERT](https://arxiv.org/abs/2004.12832)
- [Corrective Retrieval Augmented Generation](https://arxiv.org/abs/2401.15884)
- [Self-RAG: Retrieve, Generate, and Critique through Self-Reflection](https://arxiv.org/abs/2310.11511)
- [Adaptive-RAG: Adapting Retrieval to Question Complexity](https://arxiv.org/abs/2403.14403)`,
}
