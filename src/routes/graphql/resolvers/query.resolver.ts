import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import { Context } from '../types/context.js';

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
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.user.findMany();
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
