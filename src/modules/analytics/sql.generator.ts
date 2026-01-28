import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "FinTechX Analytics API"
  }
});

export async function generateSQLFromLLM(prompt: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: "upstage/solar-pro-3:free",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `
            Você é um especialista em SQL MySQL.
            Regras obrigatórias:
            - Gere apenas SQL válido para MySQL
            - Nunca explique a resposta
            - Nunca use SELECT *
            - Nunca use INSERT, UPDATE, DELETE, DROP, ALTER
            - Use apenas tabelas e colunas existentes
            - Sempre use LIMIT quando houver ORDER BY
            - Não use comentários SQL
        `
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const sql = response.choices[0].message.content?.trim();

  if (!sql) {
    throw new Error("LLM did not return SQL");
  }

  return sql.replace(/```sql|```/g, "").trim();
}
