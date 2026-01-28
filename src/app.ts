import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { analyticsRoutes } from './modules/analytics/analytics.routes';

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'FinTechX Intelligent Analytics API',
        version: '1.0.0'
      }
    }
  });

  await app.register(swaggerUI, {
    routePrefix: '/docs'
  });

  app.register(analyticsRoutes, { prefix: '/analytics' });

  return app;
}