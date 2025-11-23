import { PrismaClient } from '@prisma/client';
import type { Loaders } from '../loaders/loaders.js';

export interface Context {
  prisma: PrismaClient;
  loaders: Loaders;
}
