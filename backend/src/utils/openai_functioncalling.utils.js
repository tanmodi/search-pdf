import OpenAI from "openai";
import dotenv from "dotenv";

export async function getFunctionCall(
  tool,
  content,
  call,
  model = "gpt-3.5-turbo"
) {
  // call type object
  // tool object/array array
  // content string
  // model string if not given it take default value
  dotenv.config();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    model: model,
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
    functions: tool,
    function_call: call,
  });

  return response;
}
// module.exports = {
//   getFunctionCall
// }
