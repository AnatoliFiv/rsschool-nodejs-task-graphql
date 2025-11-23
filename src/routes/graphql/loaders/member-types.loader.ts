import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
import { MemberType } from '@prisma/client';

export const createMemberTypesLoader = (
  prisma: PrismaClient,
): DataLoader<string, MemberType | null> => {
  return new DataLoader<string, MemberType | null>(async (ids) => {
    const idArray = Array.from(ids);
    const types = await prisma.memberType.findMany({
      where: { id: { in: idArray } },
    });
    return idArray.map((id) => types.find((t) => t.id === id) || null);
  });
};
