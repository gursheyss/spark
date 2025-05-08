# spark

this is a starter template i use to bootstrap projects with the tools i've stuck with after trying a bunch of different setups. the stack might change as i go & i hope whoever comes across this can learn a thing or two (or give me some recs lol)

### framework - nextjs

i have a love-hate relationship with nextjs. it's super popular, and most of my current projects use it, so i'm keeping it in the stack. however, the more i develop with it, the more weird cases i run into. i think the client-server boundary is just too wishy-washy for my brain and it feels like any time i try to make something complex i run into some weird shit it takes me hours to figure out (but to be fair this would prob happen to every framework).

it's still the best framework for my use case right now, though. i'll probably move to tanstack router in the future once they [`devinxi`](https://github.com/TanStack/router/commits/devinxi) so i can make a more personalized stack.

### api layer - trpc/orpc

this is the latest addition to the stack. for the project i'm building right now, i realized the importance of having a good data layer. i started off with normal server actions and loved the ability to just write functions and consume them on the frontend like they're just functions.

then i came across [zsa](https://zsa.vercel.app/docs/introduction) which fixed a lot of the type safety issues i had around actions. i later moved to [next safe action](https://next-safe-action.dev/) (cause i think zsa is deprecated?) and i really enjoyed its api.

as time went on though, i found that the problem i had was with these actions themselves. even though they're essentially just rpc calls, they still had the issue of not having a centralized router and schema definition. trpc just makes more sense in my brain with the explicit procedure definitions and middleware definitions. it gives me a clearer mental model of my api surface and makes it easier to maintain consistency across endpoints with shared validation and error handling patterns.

[orpc](https://orpc.unnoq.com/) is an alternative to trpc that i recently discovered when trying to make a backend with an openapi spec, but it's still in its infancy. i do really like it though

### data fetching - tanstack query

there isn't much to say about this - i think whenever you make an app that's even slightly complicated with its data fetching layer, it makes perfect sense to use tanstack query. i also love its integrations with trpc/orpc.

remember when i mentioned the client-server system feeling wishy-washy in my head? the rsc tanstack query implementation (which you can read about [here](https://trpc.io/docs/client/tanstack-react-query/server-components) and [here](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)) is exceptional for bridging that gap.

### database - neon

i've been using supabase for close to two years now and i've enjoyed it a lot, but i found i was really only using the database itself and not the other baas features it comes with.

so i switched to [neon](https://neon.tech) cause the db is all i needed. it also allowed me to switch to better auth while maintaining a postgres database that's scalable and has a generous free tier (that includes branching! unlike supabase)

### authentication - better auth

as i said before, i mainly was using supabase as a baas, so supabase auth along with it, but [better auth](https://betterauth.io) kinda came out of nowhere in the last few months and i've really enjoyed it.

it feels like a spiritual successor to lucia where you own all the data, which i really enjoy. their plugin system is also super nice - like their stripe plugin that makes it easy to connect authentication with payments without writing a bunch of boilerplate.

### state management - zustand/context

i started with using zustand and i still really do like it, but i've been using react's native context api more and more and i've been enjoying it. there's still some use cases where zustand shines though, especially for more complex global state that needs persistence.

### styling - shadcn + tailwind

i don't think i really need to explain this. i do think shadcn has caused the web to all look the same and i wanted to migrate off of it, but it really is just a skill issue since you can customize everything lol, so i'm keeping it.

### deployment - vercel

i still do enjoy vercel. i do see why people have a problem with it but i think their platform is still super easy and robust.

i would like to move to cloudflare eventually cause i love their ecosystem, but i've had numerous hiccups using [opennext](https://opennext.js.org/cloudflare). i'm hoping their [deployment adapters](https://github.com/vercel/next.js/discussions/77740)) would make it less painful to switch over.

i also use railway every now and then if i need something server-full? is that a word?

### analytics - posthog

i pretty much just use posthog because their free tier is very generous. i also like their ui style.

### runtime - bun

fast.

### linter/formatter - biome

as with everyone i started with eslint and prettier, but damn is it slow on large projects. biome still has the problem of a pretty small ecosystem (some libraries specifically only having rule sets for eslint) but the speed makes up for it.
