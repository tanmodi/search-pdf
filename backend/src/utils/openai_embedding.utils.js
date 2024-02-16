import OpenAI from "openai";
import dotenv from "dotenv";

export function getEmbedding(text) {
  dotenv.config();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = () => {
    return openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      encoding_format: "float",
    });
  };
  return response();
}


// Send the whole batch of cunks of data it give { {}, {}, {}}