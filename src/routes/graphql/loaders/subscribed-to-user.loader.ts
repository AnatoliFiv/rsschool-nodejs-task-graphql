import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

export const createSubscribedToUserLoader = (
  prisma: PrismaClient,
): DataLoader<string, User[]> => {
  return new DataLoader<string, User[]>(async (userIds) => {
    const ids = Array.from(userIds);
    const relations = await prisma.subscribersOnAuthors.findMany({
      where: { authorId: { in: ids } },
      include: { subscriber: true },
    });
    const map = new Map<string, User[]>();
    relations.forEach((r) => {
      const existing = map.get(r.authorId) || [];
      map.set(r.authorId, [...existing, r.subscriber]);
    });
    return ids.map((id) => map.get(id) || []);
  });
};
