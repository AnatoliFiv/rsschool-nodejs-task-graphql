import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import { User } from '@prisma/client';
import { Context } from '../types/context.js';
import { needsField } from '../utils/parse-resolve-info.js';

export const queryResolvers = {
  memberTypes: async (
    _parent: unknown,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.memberType.findMany();
  },

  memberType: async (
    _parent: unknown,
    args: { id: string },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.memberType.findUnique({
      where: { id: args.id },
    });
  },

  users: async (
    _parent: unknown,
    _args: unknown,
    context: Context,
    info: GraphQLResolveInfo,
  ) => {
    const needsUserSubscribedTo: boolean = needsField(info, 'User', 'userSubscribedTo');
    const needsSubscribedToUser: boolean = needsField(info, 'User', 'subscribedToUser');

    const includeOptions: Record<string, boolean> = {};

    if (needsUserSubscribedTo) {
      includeOptions.userSubscribedTo = true;
    }
    if (needsSubscribedToUser) {
      includeOptions.subscribedToUser = true;
    }

    const users = await context.prisma.user.findMany({
      include: Object.keys(includeOptions).length > 0 ? includeOptions : undefined,
    });

    if (!needsUserSubscribedTo && !needsSubscribedToUser) {
      return users;
    }

    const userMap = new Map<string, User>();
    users.forEach((u) => userMap.set(u.id, u));

    if (needsUserSubscribedTo) {
      users.forEach((user) => {
        const relations =
          (user as { userSubscribedTo?: Array<{ authorId: string }> }).userSubscribedTo ||
          [];
        const authors = relations
          .map((r) => userMap.get(r.authorId))
          .filter((u): u is User => u !== undefined);
        context.loaders.userSubscribedTo.prime(user.id, authors);
      });
    }

    if (needsSubscribedToUser) {
      users.forEach((user) => {
        const relations =
          (user as { subscribedToUser?: Array<{ subscriberId: string }> })
            .subscribedToUser || [];
        const subscribers = relations
          .map((r) => userMap.get(r.subscriberId))
          .filter((u): u is User => u !== undefined);
        context.loaders.subscribedToUser.prime(user.id, subscribers);
      });
    }

    return users;
  },

  user: async (
    _parent: unknown,
    args: { id: string },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.user.findUnique({
      where: { id: args.id },
    });
  },

  posts: async (
    _parent: unknown,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.post.findMany();
  },

  post: async (
    _parent: unknown,
    args: { id: string },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.post.findUnique({
      where: { id: args.id },
    });
  },

  profiles: async (
    _parent: unknown,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.profile.findMany();
  },

  profile: async (
    _parent: unknown,
    args: { id: string },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.profile.findUnique({
      where: { id: args.id },
    });
  },
} satisfies Record<string, GraphQLFieldResolver<unknown, Context>>;
