### gRPC client server example using node.js & typescipt

This repo shows an example of gRPC client server communication. And has 2 modes unaryCall & ServerStreamingCall.

unaryCall = client sending a request and server responding with an object.

ServerStreamingCall = client sending a request (id, object or void) and server responding with an stream of objects.

## Commands

`npm run build:proto` to generate/ extract typescripts from proto files

`node server` to start the server

`node client --unary 23` to start the client with unary (takes 2 params [name, id])

`node client --server-streaming null` to start the client with server streaming (takes 2 params [name, null])

## TODO

1. Need to implement a build or package system so that the modules are extracted on `npm run build cmd`

2. tsconfig.json 

3. code clean up