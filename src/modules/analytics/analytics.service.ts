import { buildAnalyticsPrompt } from "./prompt";
import { generateSQLFromLLM } from "./sql.generator";
import { validateSQL } from "../../validators/sql.validator";
import { executeQuery } from "../../database/query.executor";
import { getCache, setCache } from "../../cache/query.cache";

interface AnalyticsRequest {
  question: string;
}

export async function processQuestion(data: AnalyticsRequest) {
  const { question } = data;

   if (!question || question.trim().length === 0) {
    throw new Error("Question is required");
  }

  const cacheKey = question.trim().toLowerCase();

  const cached = getCache(cacheKey);
  if (cached) {
    return {
      ...cached,
      cached: true,
    };
  }

  const prompt = buildAnalyticsPrompt(question);

  const sql = await generateSQLFromLLM(prompt);

  console.log({ sql })
  validateSQL(sql);

  const result = await executeQuery(sql);


  const response = {
    question,
    sql,
    result,
  };

  setCache(cacheKey, response);

  return {
    ...response,
    cached: false,
  };
}
