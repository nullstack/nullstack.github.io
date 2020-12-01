TODO:
- every function receives a context
- part of the context is the props
- part of the context is the local injections
- part of the context is global store
- context can be destructured when readonly
- there is one global context per tab open
- assign a key to the context adds it to the global store
- mutate context rerenders the application
- every function receives the context merged with the arguments