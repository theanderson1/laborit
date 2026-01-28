import { FastifyRequest, FastifyReply } from "fastify";
import { processQuestion } from "./analytics.service";

interface AnalyticsRequestBody {
  question: string;
}

export async function handleQuery(
  request: FastifyRequest<{ Body: AnalyticsRequestBody }>,
  reply: FastifyReply
) {
  try {
    const { question } = request.body;

    const response = await processQuestion({ question });

    return reply.status(200).send(response);
  } catch (error: any) {
    request.log.error(error);

    return reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: error.message,
    });
  }
}
