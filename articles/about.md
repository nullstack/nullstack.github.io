---
title: Why Nullstack Exists
description: The sole purpose of Nullstack is to simplify the development by eliminating glue code and letting you focus on the logic of your application
---

The sole purpose of Nullstack is to simplify the development by eliminating glue code and letting you focus on the logic of your application.

It was created keeping in mind programmers used to developing entire systems alone, but it is easily scalable to small or even big teams, as long as each programmer knows the flow of the feature they are to develop.

## The Stack

With the stack of technologies used in the web nowadays, the most common flow is something like this:

- Front-end uses a reducer over a context that calls a fetcher;
- This fetcher brings generic information over a RESTful API;
- The RESTful API calls a server route, which calls a controller, which takes the information of a model and resolves it into a serializer;
- If you need more than one resource, this process should be repeated until all resources are fetched;
- After all the data has been fetched, only then should the front-end be able to use it;
- Reason about how to deal with server-side render and hydration of the steps above;

Note that all you wanted was to show something from the database into a view. With Nullstack, that’s all you need to concern yourself with. Everything else is “glue code” and the framework should take care of it for you.

## Feature-driven

If you’re used to working on more than one project at a time or even if you just happen to have to give sporadic maintenance to a lot of your old projects, you might have stumbled upon this scenario: you don’t remember exactly where in your code is the logic you’re trying to fix or improve.

You might have a hook whose dependencies are local variables initialized with a redux state, which was stored at some point by an action declared somewhere in your source tree and called in who knows where.

If everything pertaining to a single feature were to be in the same file, maybe you wouldn’t need to reverse engineer your own code every time you need to update or fix something.

Putting everything in a single file may sound messy at a glance, but remember that you are the one who decides the granularity of this division.

A "feature" might be an entire register form or something as small as a button that does some verifications before letting you submit that form. It’s entirely up to you, and since each component is as complete as an entire feature, you could call this button or even the entire form on other pages in your application. This leads us to **True Componentization and Code Reusability**.

## Componentization and Code Reusability

Components in Nullstack are self-sufficient.

Most frameworks are specialized in a single layer, meaning that any component will be only as complete as its framework. When exporting a Nullstack component, all the code needed to run the feature is going to be together, without the need of allocating the other layers separately.

As a side effect, entire applications can be used as components, and mounted in other applications as engines.

## Why object-oriented instead of functional

At first glance, classes may look more verbose than the trendy functional components.
This section will explain the reasons that lead us to favor classes in the development of Nullstack.

The reasons are actually connected to some core principles of Nullstack, being:

### Everything as Vanilla as Possible

We didn’t want to introduce a “Nullstack way” of doing things and wanted it to be accessible to anyone with some Javascript knowledge.

That being said, the first big problem was to address state management in a vanilla Javascript way. Supporting functional components would require a solution similar to the hooks of React.js that would be considered a mannerism of the framework.

Since we opted out of immutability as a framework constraint, we are allowed to use the native way of setting simple variables. This removes the complexity of state management that created the need of third-party state management libraries in the first place.

### No Glue Code or “Batteries Included”

Nullstack borrows the concept of “battery-included” from Ember.js, but allows you to change batteries. Everything you need to make an application should be part of the framework, and still be flexible.

A framework should do the heavy lifting and a programmer should focus on his own application.
For this reason, all you have to do is to declare your classes and let Nullstack instantiate them for you. That way, we removed the most painful aspect of dealing with classes while maintaining all of the advantages of them.

### Having a safe escape route

Object-oriented versus functional is not a new topic, and lately the former seems to be bullied out of most frameworks, leaving no place for developers that enjoy this pattern.

Admittedly classes took too long to be standardized into Javascript and the delay might have caused some traumatic bad implementations along the way.

While object-oriented programming might not be the best solution for every problem, Nullstack allows you to import functions freely and use them in the moments when they should be the weapon of choice.

## Why dependency injection instead of modularity

Nullstack context uses the dependency injection pattern, which means that everything you need can be requested from the framework at the signature level of the function.

The context is a horizontally scoped object that is injected in all of your function calls. The non-hierarchical nature of this pattern allows you to easily move around your component's logic as your application grows, while still avoiding problems like props drilling or filling your view layer with store declarations.

This has two major advantages:

- You see the dependencies of your code at a function level instead of having them all imported on top of the file.

- The framework is able to give you the most precise information about the specific environment for that function call.

## Developer Happiness

The generated application is enough to have a PWA without thinking about boilerplates, but you are completely free to override the default behavior of each moving piece.

A borrowed concept from Ruby is developer happiness. Nullstack aims to ease the developer’s life by simplifying everything possible, but without hiding things from you.

The first developers we wanted to make happy are ourselves. We made Nullstack because we had fun in the process. It started as a simple prototype on top of React.js and we got carried away, each time making it more enjoyable for us until it became its own thing.

We hope you enjoy using Nullstack as much as we do because that's what keeps this project going forward.
