import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/blog";
import { ClientMessage } from "./proto/blog_package/ClientMessage";
import { EmptyParams } from "./proto/blog_package/EmptyParams";
import { BlogHandlers } from "./proto/blog_package/Blog";
import { ServerMessage } from "./proto/blog_package/ServerMessage";
import axios from "axios";

const host = "0.0.0.0:9090";

const blogServer: BlogHandlers = {
  unaryCall(
    call: grpc.ServerUnaryCall<ClientMessage, ServerMessage>,
    callback: grpc.sendUnaryData<ServerMessage>
  ) {
    if (call.request) {
      console.log(`(server) Got client message: ${call.request.id}`);
    }
    // fetch data from the API
    axios
      .get<ServerMessage>(
        `https://jsonplaceholder.typicode.com/posts/${call.request.id}`
      )
      .then((respose) => {
        callback(null, respose.data);
      });
  },
  serverStreamingCall(
    call: grpc.ServerWritableStream<EmptyParams, ServerMessage>
  ) {
    axios
      .get<ServerMessage[]>("https://jsonplaceholder.typicode.com/posts")
      .then((respose) => {
        respose.data.forEach((item) => call.write(item));
      });
  },
};

function getServer(): grpc.Server {
  const packageDefinition = protoLoader.loadSync("./proto/blog.proto");
  const proto = grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType;
  const server = new grpc.Server();
  server.addService(proto.blog_package.Blog.service, blogServer);
  return server;
}

if (require.main === module) {
  const server = getServer();
  server.bindAsync(
    host,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Server bound on port: ${port}`);
        server.start();
      }
    }
  );
}
