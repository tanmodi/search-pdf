import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

export async function queryPinecone(
  namesapace,
  embedding,
  topK = 3,
  requireVectorValue = false,
  requireMetaData = true
) {
  dotenv.config();
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    controllerHostUrl: process.env.PINECONE_HOST_URL,
  });
  const index = pinecone.Index(process.env.PINECONE_INDEX);
  const ns = index.namespace(namesapace);
  const pineconeResponce = await ns.query({
    topK: topK,
    vector: embedding,
    includeValues: requireVectorValue,
    includeMetadata: requireMetaData,
  });
  return pineconeResponce;
}

const RES = {
  matches: [
    { id: "0", scrore: 0.5, values: [], sparseValues: undefined, metadata: {} },
    {},
    {},
  ],
  namespace: "tanmay",
  usage: {},
};
const arr = RES.matches;

arr.forEach((element) => {
  console.log(element.metadata);
});
