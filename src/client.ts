import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/blog";
import { ServerMessage } from "./proto/blog_package/serverMessage";

const host = "0.0.0.0:9090";
const packageDefinition = protoLoader.loadSync("./proto/blog.proto");
const proto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const client = new proto.blog_package.Blog(
  host,
  grpc.credentials.createInsecure()
);

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
  switch (process.argv[process.argv.length - 2]) {
    case "--unary":
      doUnaryCall(+process.argv[process.argv.length - 1]);
      break;
    case "--server-streaming":
      doServerStreamingCall();
      break;
    default:
      throw new Error("Service not specified");
  }
}

function doUnaryCall(userId: number) {
  client.unaryCall(
    {
      id: userId,
    },
    (error?: grpc.ServiceError | null, serverMessage?: ServerMessage) => {
      if (error) {
        console.error(error.message);
      } else if (serverMessage) {
        console.log(
          `(client) Got server message: ${JSON.stringify(serverMessage)}`
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
    console.log(`(client) Got server message: ${JSON.stringify(serverMessage)}`);
  });
}
