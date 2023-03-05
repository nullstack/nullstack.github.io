---
title: What is Nullstack?
description: Nullstack is an isomorphic JavaScript framework that allows developers to build Full Stack applications while staying focused on the product features, and solving the user problems, rather than spending a significant amount of their time worrying about layers of abstraction and choosing which tools make them look fancy
---

Nullstack is a full stack web framework that allows features to be created in a single component, we call it "feature-driven" components. Nullstack's main feature is having functions that run in the server and client within the same file, it uses a compilation step to create multiple bundles.
Besides that the framework comes with tons of small conviniences out of the box, but the cool thing is that all of them are usable in the exact same way, they are passed as arguments to every function of your components, and you don't have to learn a bunch of new concepts to be productive. As a rule of thumb all you need to know is ahead of time is that every static async function will run in the server, and every function receives an object with the framework context merged with the application context and the component context.

# What is feature-driven?
It means that every component is a full feature in itself, but it is up to you to decide how to break features down. As an example you could have a "BlogPost" component or you could have a Blog a Post a Comment and a Like component and they are nested to each other, heck you could even have an entire ecommerce application be a top level component imported in another application, thats the beauty of full stack components. 

In the case of the Like button for instance, you would have the server functions to load the numbers of likes that item has, a render function to show your likes, and an event that triggers a server function to save your like, all in a single file if you want, the main reasoning for this architecture is that the project managers tickets, the ux and the code look pretty much the same.

*But my bootcamp teatcher said i need at least 3 layers of abstraction to be a good developer, can i do that in Nullstack?*

Yes you can, Nullstack is a big foot-gun you can shoot your own foot in you favorite style, just ask for the permission of an adult first.

# Is it a react framework?
Nope, but it uses JSX. Nullstack does not uses hooks, instead it aims to keep JavaScript's natural flow, but makes it reactive. Fun fact tho, Nullstack actually started as a react framework that just aimed to add server functions to the components, but eventually i found that sticking to that model was limiting our creativity.

*But react has the support from all those big companies, why should we use Nullstack?*

Well, you shouldn't, use it if you want, i love using at AE Studio tho, we are building brain-to-computer interface software here, and we have a few opinions about just letting meta dominate everything. 

# Why did you build another framework?
That wasn't the original intention, we were actually trying to build a coffee shop, but we get distracted very easily... you learn more about the history behind Nullstack on Anny's TDC talk. 

Innitially we just wanted to put the server code alongside the client code, because the projects we were working on had very similar patterns, and one of those patterns was that the clients would completely change his mind all the time, and your regular clean code kinda thing was not keeping up with the changes.

# Does it use a virtual dom or a compiler or signals?
The answer is yes. Nullstack has what i like to call a "Virtual Pipeline" it optimizes things differently on different scenarios for different environments. However that is just a implementation detail, the main thing is that it **just works** and we may change anything internal at any time. The only condition we have is that anything that works in vanilla JS should work in Nullstack, so we won't adopt any cool new trends if it limits the developer experience, or if the developer now needs to be aware of new edge cases instead of getting stuff done. 

# Does it uses Classes or Functions?
It uses what ever JavaScript code you can come up with. By default it follows the same paradigm as vanilla: functions are pure, and classes hold state. I know i will lose a lot of devs after the previous sentence, but keep in mind when people say "classes are bad" they actually mean "classes are bad on the current framework i'm using", in Nullstack it just feels very natural, give it a try.

# Is it blazingly fast?
Yes. But it is optimized for what i consider the "right type of fast", its fast for the users. It uses a mix of architectures to optimize for different scenarios, but all of them aim to have the users have very responsive experiences, even when they are offline. You can always benchmark things and be microsecond happy, but that all ends when your user 3g is not feeling like reaching your server that day. That being said, we love spending time microbenchmarking things and its actually pretty fast, if you sneak into our commit history you will notice we went for "what we need to create products" first then we went code happy, as you should if you plan to code professionally and not just watch youtube videos.

# What can i build with it? Does it scale?
You can build anything you can build with regular JavaScript. We've built so far plenty of PWAs, blockchain applications across multiple blockchains (dapps), mobile games, capacitor applications, electron applications, chrome extensions and even things to visualize brain data that requires a lot of performance. Currently we have a SaaS with hundreds of thousands of hits a day, and it is holding just fine on a "regular JavaScript priced" server.

# How can i use a new framework? it wont have an ecosystem.
Remember when i mentioned we keep everything vanilla just working? that makes most JavaScript packages for browser and server compatible with Nullstack out of the box, thats a pretty huge ecosystem in my opinion. But also if you are feeling like a mad scientist, you could always just install your favorite framework on top of a Nullstack's appliaction by rendering to an element controlled by it.

# Does it have any kind of telemetry?
No, we do not collect any data. Nullstack was not build as a framework first, it was extracted from real applications we worked over the years, so the features it has are based on what we needed as oposite of what the data would point would cause better thumbnails. 

*But how will you guys know what features we want then?*

You can always tell us on discord or create an issue, we will be happy to talk about it!

# Does Nullstack have any social media?
From the 6 main contributors of Nullstack 6 of them are autistic, including the person writing this wall of text... so you mostly lost us at the "social" part. We did try tho, and we created a YouYube Channel, a Twitter, and an Instagram, but 4 of us also have ADHD so we ended up procrastinating and not posting on it, oops. We are pretty active on discord tho, thats the place we are forced to log anyway to coordinate our final fantasy raids.

# What is Nulla-Chan?
Nulla-Chan is the avatar of Nullstack, it belongs to a category of avatars called a "Waifu". If you don't know what a waifu is tho, that probably means that you have your life on the right track. Fun fact, the waifu character was created by the authors IRL waifu.

# What was the hardest part creating a framework?
Definitively it was deciding if we should spell it "full stack", "fullstack", or "full-stack". Seriously please tell us on discord which one to pick.

# How can i get started?
Just go to your favorite terminal and type "npx create-nullstack-app app-name", and if you are feeling fancy you can also pass the flags --typescript and --tailwind.

## Next step

⚔ Learn [how to create a nullstack project](/getting-started).