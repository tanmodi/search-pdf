import { queryPinecone } from "../utils/pinecone_query.utils.js";
import { getFunctionCall } from "../utils/openai_functioncalling.utils.js";
import { getEmbedding } from "../utils/openai_embedding.utils.js";

export async function searchData(namesapace, userQuection) {
  const embeddingResonse = await getEmbedding(userQuection);
  const embedding = embeddingResonse.data[0].embedding;
  const metaData = await queryPinecone(namesapace, embedding, 6);

  const arr = metaData.matches;
  let searchResult = [];
  let content = "";
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i].metadata.text;
    searchResult.push(element);
    content += element + "\n";
  }

  const functionName = "giveAnswer";
  const tool = [
    {
      name: "giveAnswer",
      description: "Give the sutiable answer in less than 20 words",
      parameters: {
        type: "object",
        properties: {
          answer: {
            type: "string",
            description: String(userQuection),
          },
        },
      },
    },
  ];

  const call = {
    name: functionName,
  };
  const answers = await getFunctionCall(tool, content, call);
  // console.log("answer", answers.choices[0].message.function_call.arguments);
  return answers.choices[0].message.function_call.arguments;
}
