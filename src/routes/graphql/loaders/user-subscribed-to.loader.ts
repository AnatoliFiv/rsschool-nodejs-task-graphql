import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

export const createUserSubscribedToLoader = (
  prisma: PrismaClient,
): DataLoader<string, User[]> => {
  return new DataLoader<string, User[]>(async (userIds) => {
    const ids = Array.from(userIds);
    const relations = await prisma.subscribersOnAuthors.findMany({
      where: { subscriberId: { in: ids } },
      include: { author: true },
    });
    const map = new Map<string, User[]>();
    relations.forEach((r) => {
      const existing = map.get(r.subscriberId) || [];
      map.set(r.subscriberId, [...existing, r.author]);
    });
    return ids.map((id) => map.get(id) || []);
  });
};

