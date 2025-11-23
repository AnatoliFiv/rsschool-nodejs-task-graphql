import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import { Profile } from '@prisma/client';
import { Context } from '../types/context.js';

export const profileResolvers: {
  memberType: GraphQLFieldResolver<Profile, Context>;
} = {
  memberType: async (
    parent: Profile,
    _args: unknown,
    context: Context,
    _info: GraphQLResolveInfo,
  ) => {
    return context.prisma.memberType.findUnique({
      where: { id: parent.memberTypeId },
    });
  },
};
