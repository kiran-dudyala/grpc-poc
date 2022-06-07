import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserPostsClient as _posts_package_UserPostsClient, UserPostsDefinition as _posts_package_UserPostsDefinition } from './posts_package/UserPosts';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  posts_package: {
    EmptyParams: MessageTypeDefinition
    Post: MessageTypeDefinition
    PostId: MessageTypeDefinition
    Posts: MessageTypeDefinition
    UserPosts: SubtypeConstructor<typeof grpc.Client, _posts_package_UserPostsClient> & { service: _posts_package_UserPostsDefinition }
  }
}

