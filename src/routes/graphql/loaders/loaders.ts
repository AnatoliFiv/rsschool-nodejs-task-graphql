import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
import { Post, Profile, MemberType, User } from '@prisma/client';
import { createPostsLoader } from './posts.loader.js';
import { createProfilesLoader } from './profiles.loader.js';
import { createMemberTypesLoader } from './member-types.loader.js';
import { createUserSubscribedToLoader } from './user-subscribed-to.loader.js';
import { createSubscribedToUserLoader } from './subscribed-to-user.loader.js';

export interface Loaders {
  posts: DataLoader<string, Post[]>;
  profiles: DataLoader<string, Profile | null>;
  memberTypes: DataLoader<string, MemberType | null>;
  userSubscribedTo: DataLoader<string, User[]>;
  subscribedToUser: DataLoader<string, User[]>;
}

export const createLoaders = (prisma: PrismaClient): Loaders => {
  return {
    memberTypes: createMemberTypesLoader(prisma),
    posts: createPostsLoader(prisma),
    profiles: createProfilesLoader(prisma),
    subscribedToUser: createSubscribedToUserLoader(prisma),
    userSubscribedTo: createUserSubscribedToLoader(prisma),
  };
};
