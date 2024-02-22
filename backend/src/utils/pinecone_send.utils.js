import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

export async function sendPineconeEmbedding(
  namespace,
  id,
  embedding,
  metaData
) {
  dotenv.config();
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    controllerHostUrl: process.env.PINECONE_HOST_URL,
  });
  const index = pinecone.Index(process.env.PINECONE_INDEX);
  
  const records = [
    {
      id: String(id),
      values: embedding,
      metadata: metaData,
    },
  ];

  const ns = index.namespace(namespace);
  const pineconeResonce = await ns.upsert(records);
}


// search pinecone
// make chunks with iteration
// read docs
// search top 5 /10
