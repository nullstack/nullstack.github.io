---
title: Controlled Components
description: Import Nullstack and extend your class from it define an instance method called render which returns any JSX and export the component 
---

A productive framework should not force you to think about framework details.

Nullstack takes control of its subclasses and generates a proxy for each instance.

When you call anything on your class you are actually telling Nullstack what to do with the environment behind the scenes.

This allows you to use vanilla javascript operations like assigning to a variable and see the reflect in the dom.

# Mutability

You can mutate instance variables to set 


- mutate instance variables rerenders the application
- functions are bound to this
- every function receives the context merged with the arguments
- use instance variables