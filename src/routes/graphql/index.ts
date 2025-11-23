import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  type DocumentNode,
  execute,
  type ExecutionResult,
  GraphQLError,
  parse,
  validate,
} from 'graphql';
import { schema } from './schema.js';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { depthLimitRule } from './utils/depth-limit.js';
import { createLoaders } from './loaders/loaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req): Promise<ExecutionResult> {
      let document: DocumentNode;
      try {
        document = parse(req.body.query);
      } catch (syntaxError) {
        return {
          errors: [
            syntaxError instanceof GraphQLError
              ? syntaxError
              : new GraphQLError(String(syntaxError)),
          ],
        };
      }

      const validationErrors = validate(schema, document, [depthLimitRule]);
      if (validationErrors.length > 0) {
        return {
          errors: validationErrors,
        };
      }

      const loaders = createLoaders(prisma);

      return execute({
        schema,
        document,
        variableValues: req.body.variables,
        contextValue: {
          prisma,
          loaders,
        },
      });
    },
  });
};

export default plugin;
