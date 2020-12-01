TODO:
- must be marked as static async
- server has its own context that lives as long as the server and is shared to all requests
- server functions are static therefore have no access to instance scope
- static server functions are removed from the client
- an instance function with the same name is added to the client
- the instance function will return the return of the server function
- the client instance receives an object that will be merged with the server context
- the return must be serializable
- dates will be searialized back as dates in utc
- each server function generates an api endpoint that the client calls
- server functions run locally when the code is running on the server instead of making api calls
- static async methods without a call in the class body will not generate an api endpoint*
- node fetch as dependency
- beware security each function is an api route

## Next steps

⚔ Learn about [context and attributes](/context-and-attributes).