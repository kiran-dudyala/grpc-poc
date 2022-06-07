import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/posts";
import { Post } from "./proto/posts_package/Post";
import { Posts } from "./proto/posts_package/Posts";
import { PostId } from "./proto/posts_package/PostId";
import { EmptyParams } from "./proto/posts_package/EmptyParams";
import { UserPostsHandlers } from "./proto/posts_package/UserPosts";

const host = "0.0.0.0:9090";

const blogServer: UserPostsHandlers = {
  unaryCall(
    call: grpc.ServerUnaryCall<PostId, Post>,
    callback: grpc.sendUnaryData<Post>
  ) {
    if (call.request) {
      // incoming client call, todo: maybe capture for future analytics
    }
    //callback(null, {Post});
  },
  serverStreamingCall(call: grpc.ServerWritableStream<EmptyParams, Posts>) {
    //call.write({Posts})
  },
};

const loadServer = () => {
  const packageDefinition = protoLoader.loadSync("'./proto/posts.proto");
  const proto = grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType;
  const server = new grpc.Server();
  server.addService(proto.posts_package.UserPosts.service, blogServer);
  return server;
};

if (require.main === module) {
  const server = loadServer();
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
