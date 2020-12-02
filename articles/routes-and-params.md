TODO:
- any tag (element, component, innercomponent) can receive a route
- the first route to matche in a level stops the lookup
- only matched routes will render
- routes can be nested and match once per level
- routes can have dynamic segments
- dynamic segments reflect in the local params
- inner components have their own local params if they have a route attribute
- routes can have wildcards
- wildcards can be prefixed
- you can link to routes using a tags with href starting with /
- routes with dynamic segments reinstantiate the component when the param change
- children of dynamic segments DO NOT reinstantiate when param change
- a tags can receive a path attribute
- a tags can receive params atrtibute

TODO:
- router is global to the client context
- assignments to the router will cause a history push event
- get url
- set url
- get path
- set path
- route changes are debounced
- trailing slashes are removed

TODO:
- present in the global client context
- has every query string param mapped to a key
- every key value is a string
- except for true/false which become booleans
- by default every key responds as an empty string instead of undefined
- dynamic segments from the route attribute are injected in the local context
- assigning to the params will update the query string in the url
- changes in the params will cause a history push event
- params cannot be assigned in the lifecycle inside the server yet*
- params changes are debounced
- params with dynamic segments cascade to children 
- assignments are serialized to json