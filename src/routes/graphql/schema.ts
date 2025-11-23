import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './types/query.js';
import { MutationsType } from './types/mutation.js';

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationsType,
});
