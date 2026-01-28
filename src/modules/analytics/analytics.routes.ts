import { FastifyInstance } from 'fastify';
import { handleQuery } from './analytics.controller';
import { analyticsSchema } from './analytics.schema';

export async function analyticsRoutes(app: FastifyInstance) {
  app.post(
    '/query',
    {
      schema: analyticsSchema
    },
    handleQuery
  );
}
