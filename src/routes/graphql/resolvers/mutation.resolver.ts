import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import { Context } from '../types/context.js';

interface CreateUserDto {
  name: string;
  balance: number;
}

interface ChangeUserDto {
  name?: string;
  balance?: number;
}

interface CreateProfileDto {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

interface ChangeProfileDto {
  isMale?: boolean;
  yearOfBirth?: number;
  memberTypeId?: string;
}

interface CreatePostDto {
  title: string;
  content: string;
  authorId: string;
}

interface ChangePostDto {
  title?: string;
  content?: string;
}

export const mutationResolvers = {
  createUser: async (
    _parent: unknown,
    args: { dto: CreateUserDto },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.user.create({
      data: args.dto,
    });
  },

  createProfile: async (
    _parent: unknown,
    args: { dto: CreateProfileDto },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.profile.create({
      data: args.dto,
    });
  },

  createPost: async (
    _parent: unknown,
    args: { dto: CreatePostDto },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.post.create({
      data: args.dto,
    });
  },

  changePost: async (
    _parent: unknown,
    args: { id: string; dto: ChangePostDto },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.post.update({
      where: { id: args.id },
      data: args.dto,
    });
  },

  changeProfile: async (
    _parent: unknown,
    args: { id: string; dto: ChangeProfileDto },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.profile.update({
      where: { id: args.id },
      data: args.dto,
    });
  },

  changeUser: async (
    _parent: unknown,
    args: { id: string; dto: ChangeUserDto },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.user.update({
      where: { id: args.id },
      data: args.dto,
    });
  },

  deleteUser: async (
    _parent: unknown,
    args: { id: string },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    await context.prisma.user.delete({
      where: { id: args.id },
    });
    return 'deleted';
  },

  deletePost: async (
    _parent: unknown,
    args: { id: string },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    await context.prisma.post.delete({
      where: { id: args.id },
    });
    return 'deleted';
  },

  deleteProfile: async (
    _parent: unknown,
    args: { id: string },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    await context.prisma.profile.delete({
      where: { id: args.id },
    });
    return 'deleted';
  },

  subscribeTo: async (
    _parent: unknown,
    args: { userId: string; authorId: string },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    await context.prisma.subscribersOnAuthors.create({
      data: {
        subscriberId: args.userId,
        authorId: args.authorId,
      },
    });
    return 'subscribed';
  },

  unsubscribeFrom: async (
    _parent: unknown,
    args: { userId: string; authorId: string },
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    await context.prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: args.userId,
          authorId: args.authorId,
        },
      },
    });
    return 'unsubscribed';
  },
} satisfies Record<string, GraphQLFieldResolver<unknown, Context>>;
