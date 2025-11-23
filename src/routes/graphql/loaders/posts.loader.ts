import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
import { Post } from '@prisma/client';

export const createPostsLoader = (prisma: PrismaClient): DataLoader<string, Post[]> => {
  return new DataLoader<string, Post[]>(async (authorIds) => {
    const ids = Array.from(authorIds);
    const posts = await prisma.post.findMany({
      where: { authorId: { in: ids } },
    });
    return ids.map((id) => posts.filter((p) => p.authorId === id));
  });
};
