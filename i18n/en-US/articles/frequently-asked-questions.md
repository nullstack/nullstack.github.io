---
title: Frequently Asked Questions
description: Nullstack is an isomorphic JavaScript framework that allows developers to build Full Stack applications while staying focused on the product features, and solving the user problems, rather than spending a significant amount of their time worrying about layers of abstraction and choosing which tools make them look fancy
---

## What is feature-driven?
It means that every component is a full feature in itself, but it is up to you to decide how to break features down. As an example, you could have a "BlogPost" component or you could have a Blog a Post a Comment, and a Like component and they are nested into each other, heck you could even have an entire e-commerce application be a top-level component imported in another application, that's the beauty of full stack components. 

In the case of a Like button for instance, you would have the server functions to load the number of likes that item has, a render function to show your likes, and an event that triggers a server function to save your like, all in a single file if you want, the main reasoning for this architecture is that the project manager's tickets, the UX and the code look pretty much the same.

*- But my bootcamp teacher said I need at least 3 layers of abstraction to be a good developer, can I do that in Nullstack?*

Yes you can, Nullstack is a big foot-gun you can shoot your own foot in your favorite style, just ask for the permission of an adult first.

## Is it a react framework?
Nope, but it uses JSX. Nullstack does not use hooks, instead, it aims to keep JavaScript's natural flow, but makes it reactive. Fun fact tho, Nullstack actually started as a react framework that just aimed to add server functions to the components, but eventually, I found that sticking to that model was limiting our creativity.

## Why did you build another framework?
That wasn't the original intention, We were actually trying to build a coffee shop, but We get distracted very easily... you can learn more about the history behind Nullstack in [Anny's TDC talk](https://www.youtube.com/watch?v=77qeq6cSHG8). 

Initially, We just wanted to put the server code alongside the client code, because the projects We were working on had very similar patterns, and one of those patterns was that the clients would completely change their minds all the time, and your regular clean code kinda thing was not keeping up with the changes.

I often noticed myself trying to fit into the format of the framework and changing features, or even avoiding creating new API endpoints because i didn't wanna make things to coupled or complicated. In Nullstack i just need to create a new function in the same class that just returns whatever data i need just for that case, which makes me a lot more productive and makes me think of what i'm building a lot more often than how i am building it.

## Does it use a virtual dom or a compiler or signals?
The answer is yes. Nullstack has what I like to call a "Virtual Pipeline" it optimizes things differently in different scenarios for different environments. However that is just an implementation detail, the main thing is that it **just works** and We may change anything internal at any time. The only condition We have is that anything that works in vanilla JS should work in Nullstack, so We won't adopt any cool new trends if it limits the developer experience, or if the developer now needs to be aware of new edge cases instead of getting stuff done. 

## Does it uses Classes or Functions?
It uses whatever JavaScript code you can come up with. By default it follows the same paradigm as vanilla: functions are pure, and classes hold state. I know I will lose a lot of devs after the previous sentence, but keep in mind when people say "classes are bad" they actually mean "classes are bad on the current framework I'm using" . In Nullstack it just feels very natural, give it a try.

## Is it blazingly fast?
Yes. But it is optimized for what I consider the "right type of fast", it's fast for the users. It uses a mix of architectures to optimize for different scenarios, but all of them aim to have the users have very responsive experiences, even when they are offline. 

You can always benchmark things and be excited about microseconds, but that all ends when your user 3g is not feeling like reaching your server that day. 

That being said, We love spending time micro benchmarking things and it's actually pretty fast, if you sneak into our commit history you will notice We went for "what We need to create products" first then We went "optimization happy", as you should if you plan to code professionally and not just watching clickbait.

![Nullstack's documentation lighthouse score](/lighthouse.webp)

## What can i build with it? Does it scale?
You can build anything you can build with regular JavaScript. We've built so far plenty of PWAs, blockchain applications across multiple blockchains (dApps), mobile games, capacitor applications, electron applications, chrome extensions, and even things to visualize [brain to computer interface](https://ae.studio/brain-computer-interface) data that require a lot of performance. Currently, We have a SaaS with hundreds of thousands of hits a day, and it is holding just fine on a "regular JavaScript-priced" server.

## How can i use a new framework? it won't have an ecosystem.
Remember when I mentioned We keep everything vanilla just working? that makes most JavaScript packages for browser and server compatible with Nullstack out of the box, that's a pretty huge ecosystem in my opinion. But also if you are feeling like a mad scientist, you could always just install your favorite framework on top of a Nullstack's application by rendering to an element controlled by it.

## Does it have any kind of telemetry?
No, We do not collect any data. Nullstack was not built as a framework first, it was extracted from real applications We worked on over the years, so the features it has are based on what We needed as opposite of what the data would point would cause better thumbnails. 

*- But how will you guys know what features We want then?*

You can always tell us on discord or [create an issue on GitHub](https://github.com/nullstack/nullstack/issues), We will be happy to talk about it!

## Does Nullstack have any social media?
Of the 6 main contributors of Nullstack 6 of them are autistic, including the person writing this wall of text... so you mostly lost us at the "social" part. We did try tho, and We created a [YouTube Channel](https://www.youtube.com/nullstack), a [Twitter](https://twitter.com/nullstackapp), and an [Instagram](https://www.instagram.com/nullstackapp/), but 4 of us also have ADHD so We ended up procrastinating and not posting on it, oopsie. We are pretty active on [Discord](https://discord.gg/eDZfKz264v) though, that's the place We are forced to log in anyway to coordinate our raids.

## What is Nulla-Chan?
Nulla-Chan is the avatar of Nullstack, it belongs to a category of avatars called a "Waifu". If you don't know what a waifu is, that probably means that you have your life on the right track. Fun fact, the waifu character was created by the author's IRL waifu.

## What was the hardest part creating a framework?
Definitively it was deciding if We should spell it "full stack", "fullstack", or "full-stack". Seriously please tell us on discord which one to pick.

## How can i get started?
Just go to your favorite terminal and type "npx create-nullstack-app app-name", and if you are feeling fancy you can also pass the flags --typescript and --tailwind.