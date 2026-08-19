export interface Article {
  slug: string
  title: string
  subtitle: string
  date: string
  readingTime: string
  tags: string[]
  excerpt: string
  content: string // markdown-like string
}

export const articles: Article[] = [
  {
    slug: "junior-engineers-dont-get-to-stay-junior-anymore",
    title: "Junior Engineers Don't Get to Stay Junior Anymore",
    subtitle: "AI is shortening the distance between \"Can you build this?\" and \"Should we build it this way?\"",
    date: "Aug 2025",
    readingTime: "12 min read",
    tags: ["Engineering", "AI", "Career", "Systems Thinking"],
    excerpt:
      "When I started working at Alcovia, I had a fairly conventional idea of what being a junior engineer was supposed to look like. That progression never really happened for me. I was the only engineer.",
    content: `When I started working at Alcovia, I had a fairly conventional idea of what being a junior engineer was supposed to look like.

Someone more experienced would design the system. Features would get broken down into reasonably scoped tasks. I would implement them, get my code reviewed, make mistakes, fix them, and slowly earn responsibility for larger parts of the product.

That was how I imagined the progression.

First you learn:

**How do I build this?**

Then, eventually:

**How should we build this?**

And after enough years of experience:

**Should we even build it this way?**

Except that progression never really happened for me.

I was the only engineer.

There wasn't a senior engineer above me deciding how the database should be structured. There wasn't someone else determining how different parts of the system should communicate. There wasn't an architect I could hand an integration problem to once it stopped behaving nicely.

The decisions still had to be made.

So I made them.

And somewhere along the way, I realized that the hardest parts of engineering had surprisingly little to do with writing the code itself.

## The moment a coding problem stops being a coding problem

Take something as ordinary as integrating with an external platform.

At first, the task sounds straightforward:

> Send the data to their API.

Fine.

Then our database update succeeds, but their API request fails.

Now the question becomes:

> What happens to the system?

Do we retry?

What if the request actually succeeded on their side but the response never reached us?

Can retrying create duplicate state?

Which system is supposed to be the source of truth?

How do we know when the two systems disagree?

And once they disagree, how do we repair them?

Suddenly, the difficult part isn't writing an HTTP request anymore.

It's retries, idempotency, reconciliation, failure states, ownership, and deciding what guarantees the system is actually supposed to provide.

I ran into the same shift with AI workflows.

Calling an AI model is easy.

But what happens when the operation takes longer than an HTTP request should remain open? Do you keep the user waiting? Do you turn it into an asynchronous job? How does the frontend know when it finishes? What happens when the job fails halfway through?

Again, the implementation wasn't really the hard question.

The system around the implementation was.

At first, I thought this was simply a consequence of being in an unusual situation. If you're the only engineer at a small company, of course you're going to be forced into decisions earlier than usual.

But the more I look at how AI is changing software development, the more I wonder whether my experience was an exaggerated version of something many junior engineers are about to face.

## The implementation layer is getting cheaper

For a long time, implementation was a major part of the junior-engineer apprenticeship.

You were given bounded problems.

You wrote a lot of code.

Some of it was bad.

Someone reviewed it.

You rewrote it.

Eventually something broke in production.

You figured out why.

Then you did the whole thing again.

Over time, all of those small experiences started turning into intuition.

You learned that APIs fail in ways documentation never warned you about.

You learned that retries can make a problem worse.

You learned that database schemas survive much longer than anyone expects.

You learned that distributed state eventually disagrees.

You learned that requirements change.

You learned that a beautiful abstraction can become a terrible maintenance burden.

You learned that the technically impressive solution is often not the right product decision.

That apprenticeship took years.

And implementation gave you somewhere to live while you were developing that judgment.

Now AI is becoming extremely good at implementation.

Give a coding agent a sufficiently clear requirement and it can generate an endpoint, database model, validation layer, frontend component, tests, background worker, or integration surprisingly quickly.

That doesn't mean the code will always be correct.

It doesn't mean humans stop coding.

But it changes where the bottleneck is.

If producing code becomes dramatically cheaper, then the difficult part moves upward.

The valuable question becomes less:

> Can you implement this?

And more:

> Do you understand what should be implemented?

That is a very different skill.

## AI gives us leverage before it gives us judgment

This is the part I find most interesting.

A junior engineer today can build things far beyond what a junior engineer could realistically build alone a few years ago.

That's incredible.

It's also dangerous.

I can ask an agent:

> Build me a background job with exponential backoff and retries.

And a few minutes later, I may have working code.

But the existence of that code doesn't answer:

Should this operation be retried?

Is it safe to execute twice?

How long should we keep retrying?

What happens after every retry fails?

Could multiple workers process the same operation?

How would we detect that the system has silently stopped working?

Does this complexity even need to exist?

AI can help me implement almost any answer I choose.

It cannot automatically make the answer a good one.

That creates a strange imbalance.

**Our ability to produce software is increasing faster than our ability to develop engineering judgment.**

Or put another way:

**AI gives us leverage before it gives us wisdom.**

A developer who doesn't completely understand queues can now build a queue-backed system.

Someone who doesn't deeply understand authentication can generate an authentication flow.

Someone who has never operated a distributed system can produce one.

We can create systems we don't fully understand faster than ever before.

Which means understanding what we're creating matters more, not less.

## Coding and engineering are not the same thing

I used to think becoming a better software engineer mostly meant becoming better at writing software.

Learn the language more deeply.

Write cleaner code.

Understand frameworks.

Improve at algorithms.

Know more libraries.

Those things still matter.

But I'm increasingly convinced that the gap between **coding** and **engineering** is becoming much more visible.

Coding asks:

> How do I implement this feature?

Engineering asks:

> What problem is this feature actually solving?

Coding asks:

> How do I connect these services?

Engineering asks:

> Should these services be coupled in the first place?

Coding asks:

> How do I retry this operation?

Engineering asks:

> What does retrying mean for the correctness of the system?

Coding asks:

> How do I add another table?

Engineering asks:

> What invariant is this data model supposed to protect?

Coding asks:

> How do I make this scalable?

Engineering sometimes asks:

> Does this need to scale yet?

As our tools become better at answering the first category of questions, engineers have to spend more of their time thinking about the second.

And I don't think juniors can treat those questions as something that begins once the word **Senior** appears in their title.

## That doesn't mean juniors suddenly have to be senior engineers

There's an important distinction here.

I am not saying junior engineers are suddenly staff or principal engineers.

They're not.

Having to make an architectural decision doesn't magically give someone ten years of architectural experience.

There is a reason experienced engineers develop instincts that younger engineers don't have yet.

They've watched things fail.

They've inherited systems designed around forgotten assumptions.

They've debugged incidents where every component appeared healthy individually while the system as a whole was broken.

They've made reasonable decisions and then spent the next two years discovering why those decisions were wrong.

That experience matters.

You cannot speedrun all of it by reading system-design books or asking an LLM enough questions.

But you **can** start asking the same categories of questions earlier.

That's the difference.

You don't need ten years of experience to ask:

What can fail here?

Who owns this data?

Can this happen twice?

What assumptions am I making?

How will we know when this breaks?

What will make this difficult to change later?

You need experience to become consistently good at answering those questions.

And I think junior engineers need to start building that muscle much earlier.

## The apprenticeship problem

This creates another problem that I don't think we talk about enough.

If AI reduces the amount of implementation-heavy work junior engineers traditionally did, how do juniors acquire the experience that implementation work used to provide?

Senior engineers didn't develop judgment because somebody taught them a list of architecture rules.

They accumulated scar tissue.

They shipped things.

They broke things.

They fixed things.

They watched seemingly harmless decisions create strange production failures months later.

They discovered that systems behave differently once real users, real data, and real failures are involved.

That experience slowly became intuition.

Now we're potentially compressing the apprenticeship without necessarily compressing the amount of experience required to develop that intuition.

AI can show you an architectural pattern instantly.

It cannot give you the memory of watching that pattern fail at 3 a.m.

That's why I don't think using better AI tools removes the need to deeply understand software systems.

I think it creates the opposite pressure.

The more implementation we delegate, the more intentional we have to become about learning everything around the implementation.

## So what should junior engineers actually learn?

Not everything.

I don't think a new graduate needs to become an expert in distributed systems, networking, databases, security, product management, infrastructure, observability, operating systems, and Kubernetes before writing their first line of production code.

That's unrealistic.

But I do think we have to stop treating systems thinking as something above our pay grade.

When you're implementing something, don't stop at:

> Does it work?

Start asking:

- What problem are we actually solving?
- What assumptions does this design make?
- What must always remain true?
- Which component owns the data?
- What happens if this fails halfway through?
- Can this operation safely happen more than once?
- What happens if two requests arrive simultaneously?
- How will we know when something breaks?
- How do we recover when it does?
- What happens when the requirement changes?
- Is the complexity we're adding actually justified?

Sometimes you won't know.

That's fine.

The important part is noticing that the question exists.

Because once you notice it, you can research it. You can ask someone more experienced. You can test your assumptions. You can use AI to explore possible designs instead of simply asking it to write the first one.

That's a fundamentally different way of using these tools.

## Maybe that's what being junior looks like now

I don't think the most valuable engineer in the AI era will be the person who can generate the most code.

Machines are getting very good at generating code.

The valuable engineer will increasingly be someone who can take a messy problem and make it less messy.

Someone who can turn an ambiguous requirement into something precise.

Someone who notices the failure case nobody discussed.

Someone who questions an unnecessary abstraction.

Someone who understands where a system boundary should exist.

Someone who can look at perfectly working code and still say:

> This solves the wrong problem.

Or:

> This works today, but the failure mode is unacceptable.

Or even:

> We shouldn't build this at all.

Those abilities have traditionally been associated with engineers much further into their careers.

I don't think that means juniors suddenly need senior-level judgment.

I think it means we need to start **developing** that judgment earlier.

That distinction matters.

## I had to learn that earlier than I expected

Being the only engineer forced me to confront many of these questions before I felt prepared for them.

There were plenty of times when I wanted someone with five more years of experience beside me so I could simply ask:

> What would you do?

Sometimes there wasn't anyone else there to make the call.

So I had to understand the problem.

I had to research.

I had to think through the tradeoffs.

I had to make a decision.

And sometimes I had to discover that the decision wasn't as good as I thought it was.

That changed the way I think about engineering.

The code is important.

But increasingly, writing the code feels like only one part of the job.

The harder part is understanding the system that code is entering.

Its requirements.

Its assumptions.

Its boundaries.

Its failures.

Its consequences.

AI is shortening the distance between **"Can you build this?"** and **"Should we build it this way?"**

And for junior engineers, that means the second question is arriving much sooner.

We still get to be inexperienced.

We still need mentors.

We still need years of mistakes before some lessons truly stick.

But we probably don't get to spend those years thinking only about the ticket in front of us.

AI can give a junior engineer an astonishing amount of leverage.

What it cannot give us is the judgment that traditionally came from years of making decisions and living with their consequences.

We'll still have to earn that.

We may just have to start earning it much sooner.

**Junior engineers still get to be inexperienced. We just don't get to think narrowly anymore.**`,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getAllArticles(): Article[] {
  return articles
}
