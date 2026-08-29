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
    slug: "authentication-is-not-one-thing",
    title: "Authentication Is Not One Thing",
    subtitle: "The mental model that finally separated sessions, JWTs, OAuth, OIDC, and SSO for me.",
    date: "Aug 2026",
    readingTime: "11 min read",
    tags: ["Engineering", "Security", "Authentication", "System Design"],
    excerpt:
      "For a long time, authentication was one blurry box in my head called login. The moment I separated identity, credentials, continuity, delegation, and permissions, the whole system became easier to reason about.",
    content: `For a long time, authentication was one blurry box in my head called **login**.

A user enters an email and password. The backend checks them. A JWT comes back. Somewhere around that flow, OAuth, sessions, cookies, API keys, and authorization all seemed to belong to the same category.

I knew the words. I had used some of them. But if someone had asked me where one concept ended and the next began, my explanation would have become vague very quickly.

Then I watched Hayk Simonyan's video, [7 Authentication Concepts Every Developer Should Know](https://www.youtube.com/watch?v=iX8g4LqF8p8), and the most useful part was not learning seven new definitions.

It was realizing that I had been placing several different layers of a system inside one mental box.

A JWT is not an authentication method. OAuth 2.0 is not a login protocol. SSO is not a token. An API key usually identifies an application, not the human using it. Authentication and authorization are connected, but they do not answer the same question.

Once I separated those ideas, authentication stopped feeling like a collection of acronyms and started looking like a system.

**The biggest source of confusion in authentication is not that the concepts are individually difficult. It is that we use them together and then talk about them as if they are interchangeable.**

## The first split: identity is not permission

Authentication answers:

> Who is making this request?

Authorization answers:

> Now that I know who you are, what are you allowed to do?

That order matters.

Logging into an admin dashboard proves an identity. It does not automatically prove that the identity should be able to delete another user, view billing information, or change production settings.

This is also why HTTP has different responses for these situations. A \`401 Unauthorized\` response means the request does not have valid authentication credentials. A \`403 Forbidden\` response means the server understood the request but refuses the action. The name of 401 is slightly unfortunate, but the distinction is useful: one is about proving identity, and the other is about permission.

I used to think of authorization as a detail attached to authentication. Now I think of it as a separate decision that happens after authentication and needs its own design.

[[diagram:auth-layers]]

This diagram is the mental model I was missing. Basic Auth, JWT, OAuth, and SSO are not four competing answers to one question. They live at different parts of the stack.

## Credentials: how a client proves something

The simplest place to begin is HTTP Basic Authentication.

With Basic Auth, the client sends a username and password with every request in the \`Authorization\` header. The credentials are Base64-encoded, but Base64 is only an encoding. Anyone who gets the value can decode it.

That means HTTPS is not optional. Without encrypted transport, the credentials are exposed. Even with HTTPS, repeatedly sending the user's password creates more opportunities for it to leak through logs, proxies, or poorly handled requests.

Digest Authentication tried to improve this by using a challenge from the server and sending a derived response instead of the raw password. The password does not travel in the same direct form, and the challenge helps resist replay of an identical response.

But that does not make Digest the obvious modern default. Its security depends on the exact algorithm and configuration, and it still does not replace TLS. It helped me see an important pattern, though: authentication methods are often attempts to reduce how much valuable credential material crosses the network.

API keys solve a related but different problem.

An API key is usually a credential for a program, project, or integration. When a weather service gives my backend an API key, the service can identify which application is calling, apply a quota, and revoke access later. It does not necessarily know which person clicked the button that caused the request.

That distinction becomes important in real systems.

If I use the same API key for every user, the key can authenticate my application while telling the receiving API almost nothing about the individual user. If I need user-level identity or permissions, I need another mechanism on top of it.

**A credential only proves the identity it was issued to represent. It does not automatically represent the human at the keyboard.**

## Sessions: the server remembers you

Sending a password with every request is unnecessary once the user has logged in successfully.

Session-based authentication replaces that repeated proof with a temporary reference.

The user submits credentials once. The server verifies them, creates a session record, and returns a session identifier, commonly in a cookie. On later requests, the browser sends the cookie and the server looks up the session.

The session ID is intentionally uninteresting by itself. The useful state remains on the server: the user ID, expiration, roles, or whatever else the application needs.

This makes the system stateful. If the application runs on several servers, they need a shared session store or a routing strategy that consistently reaches the right state. That adds infrastructure, but statefulness has a major advantage: revocation is straightforward.

Delete the session and the reference stops working.

Sessions are sometimes described as old-fashioned while JWTs are described as modern. I no longer think that framing is useful. A server-rendered web application can be extremely well served by a secure session cookie. The choice is about the shape of the system, not which technology sounds newer.

The real security work also does not end when the session exists. Cookies need the right \`HttpOnly\`, \`Secure\`, and \`SameSite\` settings. State-changing requests need CSRF protection where applicable. Session identifiers need enough entropy, sensible expiration, and rotation after login.

The mechanism may be simple. Operating it carelessly is not.

## Bearer tokens and JWTs are not synonyms

Token-based authentication changes what the client sends after login.

A bearer token means that possession is enough to use it. The server does not ask the client to prove a second secret associated with the token. Whoever bears it can present it.

That is a usage model, not a file format.

A JWT, or JSON Web Token, is a format for carrying claims. It can contain a subject, issuer, audience, expiration time, and other data. A JWT can be signed so that a service can detect modification and trust the issuer that created it.

These ideas often appear together because a signed JWT is commonly used as a bearer access token. But they are not the same thing.

- A bearer token does not have to be a JWT. It can be an opaque random string.
- A JWT does not have to be an access token. OpenID Connect, for example, uses a JWT as an ID token.
- A signed JWT is usually readable. A signature protects integrity; it does not hide the payload.

That last point is easy to miss. Putting a password or another secret inside a normal signed JWT does not make the secret encrypted. Anyone holding the token can decode its header and payload.

JWTs are often called stateless because an API can validate the signature and read the claims without querying a central session store. That can be valuable when many independent services need to validate the same identity.

But statelessness is not free.

If a token is stolen, a locally validated token normally remains usable until it expires. If permissions change, old claims may remain valid. If the system adds a denylist or checks the database on every request to solve those problems, some of the state has simply returned under a different name.

[[diagram:session-vs-token]]

So the useful comparison is not "sessions bad, JWTs good."

It is:

- Where should the state live?
- How quickly must access be revocable?
- How many services need to validate the credential?
- What happens when roles or permissions change?
- What is the damage if the credential is stolen?

The answers determine whether a server-side session, an opaque token, a locally validated JWT, or a combination makes sense.

## Access and refresh tokens split the risk

Short-lived access tokens create a usability problem.

If an access token expires every few minutes, forcing the user to type a password every few minutes would be secure in one sense and unusable in every practical sense.

Refresh tokens are the compromise.

The access token is short-lived and sent to APIs. The refresh token lives longer and is used only to obtain a new access token. The user can stay signed in while the credential exposed to routine API traffic has a limited lifetime.

This also means the refresh token is more valuable. If an attacker steals it, they may be able to create new access tokens long after the original one expires.

That changes how it should be handled. Refresh tokens should be stored more carefully, revocable, and often rotated when used. With rotation, each refresh produces a new refresh token and invalidates the previous one. Reuse of an older token can then signal that it was copied.

The pair is not just "a long token and a short token." It is a deliberate split between a frequently used credential with a small window of damage and a powerful credential exposed to fewer places.

## OAuth 2.0 is about delegated access

The sentence I needed to remember is simple:

**OAuth 2.0 is an authorization framework.**

Imagine I build an application that needs to read a user's Google Calendar.

The worst design would ask for the user's Google password and impersonate them. My application would receive far more power than it needs, and the user would have to change their password to remove my access.

OAuth 2.0 introduces a delegation flow instead.

My application redirects the user to Google. Google authenticates the user and asks whether my application can receive a specific scope, such as read-only calendar access. If the user agrees, my application eventually receives an access token representing that limited permission.

The important part is what the token says conceptually:

> This application may perform these actions on behalf of the resource owner.

It does not inherently say:

> This is everything the application needs to know about the user's identity.

OAuth separates the resource owner, client application, authorization server, and resource server. That separation lets a user grant limited access without handing the client their main credentials.

Modern browser and mobile flows normally use the authorization code flow with PKCE. The details matter: redirect URIs must be validated, state must be protected, tokens must be checked for the correct issuer and audience, and a maintained library is usually a much better choice than implementing the protocol from memory.

## OpenID Connect adds the identity layer

If OAuth 2.0 grants access, how does "Sign in with Google" tell my application who signed in?

That is where OpenID Connect, or OIDC, fits.

OIDC adds an identity layer on top of OAuth 2.0. An OIDC request includes the \`openid\` scope, and the provider can return an ID token containing claims about the authentication event and the user. The ID token is a JWT, but its job is different from an access token.

- The access token is presented to a resource server to call an API.
- The ID token is consumed by the client to establish who authenticated.

Using the ID token as an API access token mixes those responsibilities and can create security problems. Each token needs to be validated and used for the audience it was issued for.

[[diagram:oauth-oidc]]

This was the point where the vocabulary finally connected for me.

OAuth 2.0 and OIDC are not competing login options. OIDC uses OAuth 2.0's machinery and adds a standardized identity result.

## SSO is the experience, not the protocol

Single Sign-On describes what the user experiences: sign in once, then enter several related applications without being asked for credentials each time.

That experience requires the applications to trust a shared identity provider. The underlying protocol might be OpenID Connect or SAML, which is still common in enterprise environments.

This is why saying "we use SSO" does not completely describe the implementation. It describes the outcome.

The benefit is obvious. Users manage fewer passwords, organizations can centralize access policy, and disabling one central account can remove access across many applications.

The trade-off is equally important. The identity provider becomes critical infrastructure. If it is unavailable, every connected application may become unavailable to users. If it is compromised, the blast radius can include every application that trusts it.

Convenience and central control come with central dependency.

## How I would choose now

I used to begin with a technology:

> Should I use JWT authentication?

Now I think that question arrives too early.

I would first ask:

- Who or what is being authenticated: a person, browser, mobile app, service, or third-party integration?
- Is this a first-party login or delegated access to another platform?
- Which services need to validate the result?
- How quickly must credentials and permissions be revoked?
- Where can credentials be stored safely?
- What trust boundary does each request cross?
- Does the user need one login across several applications?

For a conventional first-party web application, a server-side session with a secure cookie may be the clearest design.

For an API used by mobile clients or several services, short-lived access tokens may fit better.

For an application acting on a user's behalf against another service, OAuth 2.0 is the relevant framework.

For login through an external identity provider, OIDC provides the identity layer.

For organization-wide login across many products, SSO may be the required experience, implemented with OIDC or SAML.

For a server-to-server integration, an API key or an OAuth client-credentials flow may represent the calling application.

None of these choices removes the need for authorization. Knowing who made the request still does not decide whether that identity may perform the action.

## The lesson was really about naming

Authentication code is often hidden behind frameworks, middleware, SDKs, and identity providers. That is useful. I do not want every application to invent password storage or implement OAuth from scratch.

But abstraction makes the vocabulary more important, not less.

If I call every token a JWT, I may validate an ID token where an access token is required. If I treat OAuth as authentication, I may assume delegated API access proves identity. If I treat authentication as authorization, I may allow a logged-in user to do something they should never be permitted to do.

Those are not academic naming mistakes. They change the security of the system.

The login screen is only the visible beginning. Behind it are questions about credentials, state, token lifetime, trust, delegation, identity, and permissions.

I still do not need to memorize every line of every specification.

But I do need to know which question each part of the system is answering.

**Authentication became much easier to understand when I stopped treating it as one thing.**

## Sources and further reading

- [7 Authentication Concepts Every Developer Should Know — Hayk Simonyan](https://www.youtube.com/watch?v=iX8g4LqF8p8)
- [OAuth 2.0 Authorization Framework — RFC 6749](https://www.rfc-editor.org/rfc/rfc6749)
- [OAuth 2.0 Bearer Token Usage — RFC 6750](https://www.rfc-editor.org/rfc/rfc6750)
- [JSON Web Token — RFC 7519](https://www.rfc-editor.org/rfc/rfc7519)
- [OpenID Connect Core 1.0 — OpenID Foundation](https://openid.net/specs/openid-connect-core-1_0.html)`,
  },
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
