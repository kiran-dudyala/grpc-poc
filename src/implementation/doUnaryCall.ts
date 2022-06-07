// import * as grpc from "@grpc/grpc-js";
// import { UserPostsClient } from "../proto/posts_package/UserPosts";
// import { UserPosts } from "./proto/posts_package/UserPosts";

// function doUnaryCall(client: UserPostsClient) {
//   client.unaryCall(
//     {
//       id: 1,
//     },
//     (error?: grpc.ServiceError, serverMessage?: UserPost) => {
//       if (error) {
//         console.error(error.message);
//       } else if (serverMessage) {
//         console.log(
//           `(client) Got server message: ${serverMessage.serverMessage}`
//         );
//       }
//     }
//   );
// }
