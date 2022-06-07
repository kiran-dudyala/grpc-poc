// Original file: proto/posts.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { EmptyParams as _posts_package_EmptyParams, EmptyParams__Output as _posts_package_EmptyParams__Output } from './EmptyParams';
import type { Post as _posts_package_Post, Post__Output as _posts_package_Post__Output } from './Post';
import type { PostId as _posts_package_PostId, PostId__Output as _posts_package_PostId__Output } from './PostId';
import type { Posts as _posts_package_Posts, Posts__Output as _posts_package_Posts__Output } from './Posts';

export interface UserPostsClient extends grpc.Client {
  serverStreamingCall(argument: _posts_package_EmptyParams, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_posts_package_Posts__Output>;
  serverStreamingCall(argument: _posts_package_EmptyParams, options?: grpc.CallOptions): grpc.ClientReadableStream<_posts_package_Posts__Output>;
  serverStreamingCall(argument: _posts_package_EmptyParams, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_posts_package_Posts__Output>;
  serverStreamingCall(argument: _posts_package_EmptyParams, options?: grpc.CallOptions): grpc.ClientReadableStream<_posts_package_Posts__Output>;
  
  unaryCall(argument: _posts_package_PostId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_posts_package_Post__Output>): grpc.ClientUnaryCall;
  unaryCall(argument: _posts_package_PostId, metadata: grpc.Metadata, callback: grpc.requestCallback<_posts_package_Post__Output>): grpc.ClientUnaryCall;
  unaryCall(argument: _posts_package_PostId, options: grpc.CallOptions, callback: grpc.requestCallback<_posts_package_Post__Output>): grpc.ClientUnaryCall;
  unaryCall(argument: _posts_package_PostId, callback: grpc.requestCallback<_posts_package_Post__Output>): grpc.ClientUnaryCall;
  unaryCall(argument: _posts_package_PostId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_posts_package_Post__Output>): grpc.ClientUnaryCall;
  unaryCall(argument: _posts_package_PostId, metadata: grpc.Metadata, callback: grpc.requestCallback<_posts_package_Post__Output>): grpc.ClientUnaryCall;
  unaryCall(argument: _posts_package_PostId, options: grpc.CallOptions, callback: grpc.requestCallback<_posts_package_Post__Output>): grpc.ClientUnaryCall;
  unaryCall(argument: _posts_package_PostId, callback: grpc.requestCallback<_posts_package_Post__Output>): grpc.ClientUnaryCall;
  
}

export interface UserPostsHandlers extends grpc.UntypedServiceImplementation {
  serverStreamingCall: grpc.handleServerStreamingCall<_posts_package_EmptyParams__Output, _posts_package_Posts>;
  
  unaryCall: grpc.handleUnaryCall<_posts_package_PostId__Output, _posts_package_Post>;
  
}

export interface UserPostsDefinition extends grpc.ServiceDefinition {
  serverStreamingCall: MethodDefinition<_posts_package_EmptyParams, _posts_package_Posts, _posts_package_EmptyParams__Output, _posts_package_Posts__Output>
  unaryCall: MethodDefinition<_posts_package_PostId, _posts_package_Post, _posts_package_PostId__Output, _posts_package_Post__Output>
}
