import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/posts";
import { Post } from "./proto/posts_package/Post";
import { Posts } from "./proto/posts_package/Posts";
import { PostId } from "./proto/posts_package/PostId";
import { EmptyParams } from "./proto/posts_package/EmptyParams";
import { UserPostsHandlers } from "./proto/posts_package/UserPosts";

const host = "0.0.0.0:9090";

const packageDefinition = protoLoader.loadSync("./proto/posts.proto");

const proto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

// TODO: this needs to be secure in production.
const client = new proto.posts_package.UserPosts(
  host,
  grpc.credentials.createInsecure()
);

// ping the server
const deadline = new Date();

deadline.setSeconds(deadline.getSeconds() + 5);

client.waitForReady(deadline, (error?: Error) => {
  if (error) {
    console.log(`Client connect error: ${error.message}`);
  } else {
    onClientReady();
  }
});

function onClientReady() {
  switch (process.argv[process.argv.length - 1]) {
    case "--unary":
      doUnaryCall();
      break;
    case "--server-streaming":
      doServerStreamingCall();
      break;
    default:
      throw new Error("Example not specified");
  }
}

function doUnaryCall() {
  client.unaryCall(
    {
      id: 2,
    },
    (error?: grpc.ServiceError, post: {

    }) => {
      if (error) {
        console.error(error.message);
      } else if (post) {
        console.log(
          `(client) Got server message: ${post}`
        );
      }
    }
  );
}

function doServerStreamingCall() {
  const stream = client.serverStreamingCall({
    clientMessage: "Message from client",
  });
  stream.on("data", (serverMessage: ServerMessage) => {
    console.log(`(client) Got server message: ${serverMessage.serverMessage}`);
  });
}
