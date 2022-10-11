---
title: "0.16.5 Release Candidate Announcement"
description: "We're (finally) officially releasing Nullstack!"
date: "Oct. 2022"
author:
  name: Anny Figueira
  handle: AnnyFigueira
---

We're proud to announce the first release candidate of Nullstack, after ~5 years of development and over 4 years of it being used in real-life, production projects.

Every time we thought about officially releasing a 1.0 version, we got more feature requests from the community and implemented them. Now we believe we reached a pretty solid, complete state in terms of both our API and the core functionality.

Nullstack is a fullstack Javascript framework that aims to facilitate the process of quickly building MVPs with quality and scalability, by allowing developers to plug-in-play individual features into the code base seamlessly. For this reason, we value horizontal over vertical code, although the framework is flexible enough to allow pretty much any design pattern you would like to use.

It was implemented using vanilla JS and allows you to build pretty much anything, from PWAs to mobile applications and even Google Chrome extensions within the same codebase. It also comes with support for babel, typescript and tailwind out of the box, and its backend is built on top of express, so that a dev wouldn't need to learn anything new to be able to start using it.

We also have a routing system and state management as part of the framework, our variables are variables (it's not stateless, but rather stateful) and class attributes are reactive.

One cool thing about Nullstack is that we value **not** having Nullstack-specific notation, which means it supports any default HTML tag such as an `<a>` for links and the framework handles it just fine, without going out of SPA mode just because of it. We also support the normal HTML attributes such as `class` and `onclick`, and we support any vanilla JS library that exists, relying on the already robust JavaScript and Node ecosystem.

Apart from personal and freelancing projects, we've also been using Nullstack for the past year at AE Studio on both skunkworks and clients projects, to a point where we even made it part of our onboarding process. We're pretty adamant about how much it not only allows us to speed up the development process, but also the quality of life for developers.

So, without further ado, we invite everyone to give it a try.

All you need to do is run `npx create-nullstack-app@latest project-name` and start having fun!

If you have any questions, feel free to join our [Discord server](https://discord.com/invite/eDZfKz264v) where you can interact with our community 🥰

Found a bug or have a feature request? Feel free to [open an issue](https://github.com/nullstack/nullstack/issues) at our Github.

Like what you see? [Give us a star](https://github.com/nullstack/nullstack/stargazers)🌟.
