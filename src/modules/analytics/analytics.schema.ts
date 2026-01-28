export const analyticsSchema = {
  tags: ["Analytics"],
  summary: "Consulta analítica em linguagem natural",
  body: {
    type: "object",
    required: ["question"],
    properties: {
      question: {
        type: "string",
        description: "Pergunta em linguagem natural sobre os dados"
      }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        question: { type: "string" },
        sql: { type: "string" },
        result: { type: "array", items: { type: "object", additionalProperties: true } }
      }
    }
  }
};
