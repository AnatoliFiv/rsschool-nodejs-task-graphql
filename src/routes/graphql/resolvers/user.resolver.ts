import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import { User } from '@prisma/client';
import { Context } from '../types/context.js';

export const userResolvers: {
  profile: GraphQLFieldResolver<User, Context>;
  posts: GraphQLFieldResolver<User, Context>;
  userSubscribedTo: GraphQLFieldResolver<User, Context>;
  subscribedToUser: GraphQLFieldResolver<User, Context>;
} = {
  profile: async (
    parent: User,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.loaders.profiles.load(parent.id);
  },

  posts: async (
    parent: User,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.loaders.posts.load(parent.id);
  },

  userSubscribedTo: async (
    parent: User,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.loaders.userSubscribedTo.load(parent.id);
  },

  subscribedToUser: async (
    parent: User,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.loaders.subscribedToUser.load(parent.id);
  },
};
