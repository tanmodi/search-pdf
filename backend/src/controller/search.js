import { queryPinecone } from "../utils/pinecone_query.utils.js";
import { getFunctionCall } from "../utils/openai_functioncalling.utils.js";
import { getEmbedding } from "../utils/openai_embedding.utils.js";

async function searchData() {
//   const userQuection = `When did tanmay done Bachelor of computer application?`;
// const userQuection = `What skills tanmay have name 5 skills`;
// const userQuection = `What is github link of tanmay`;
// const userQuection = `What is linked link of tanmay`;
// const userQuection = ` project done `;
const userQuection = `tanmay marks in accountancy`;

  const embeddingResonse = await getEmbedding(userQuection);

  const namesapace = "tmr";
  const embedding = embeddingResonse.data[0].embedding;
  console.log("embedding is ", embedding);
  const metaData = await queryPinecone(namesapace, embedding , 6);

  const arr = metaData.matches;
  let searchResult = [];
  let content = "";
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i].metadata.text;
    searchResult.push(element);
    content += element + "\n";
  }
  console.log("content", content);
  const functionName = "giveAnswer";
  //   const tool = [
  //       {
  //         name: functionName,
  //         description: "give the most sutiable answer",
  //         parameters: {
  //             type: "string",
  //             description: String(userQuection),
  //         },
  //       },
  //   ]
  const tool = [
    {
      name: "giveAnswer",
      description: "Give the sutiable answer",
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
  const answer = await getFunctionCall(tool, content, call);
  console.log("answer", answer.choices[0].message.function_call.arguments);
}
// searchData();
