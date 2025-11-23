import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
import { Profile } from '@prisma/client';

export const createProfilesLoader = (
  prisma: PrismaClient,
): DataLoader<string, Profile | null> => {
  return new DataLoader<string, Profile | null>(async (userIds) => {
    const ids = Array.from(userIds);
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: ids } },
    });
    return ids.map((id) => profiles.find((p) => p.userId === id) || null);
  });
};

