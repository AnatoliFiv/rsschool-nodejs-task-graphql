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
    return context.prisma.profile.findUnique({
      where: { userId: parent.id },
    });
  },

  posts: async (
    parent: User,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.post.findMany({
      where: { authorId: parent.id },
    });
  },

  userSubscribedTo: async (
    parent: User,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    const relations = await context.prisma.subscribersOnAuthors.findMany({
      where: { subscriberId: parent.id },
      include: { author: true },
    });
    return relations.map((r) => r.author);
  },

  subscribedToUser: async (
    parent: User,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    const relations = await context.prisma.subscribersOnAuthors.findMany({
      where: { authorId: parent.id },
      include: { subscriber: true },
    });
    return relations.map((r) => r.subscriber);
  },
};
