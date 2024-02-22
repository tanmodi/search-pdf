import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

export async function sendPineconeEmbedding(
  namespace,
  id,
  embedding,
  metaData
) {
  // index of pinecone string
  // namesapace of the user string
  // embedding value of data []
  // metaData object
  dotenv.config();
  console.log("embedding is in function ", embedding);
  console.log("in sendPineconeEmbedding", Array.isArray(embedding));
  console.log("metaData", metaData);
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    controllerHostUrl: process.env.PINECONE_HOST_URL,
  });
  const index = pinecone.Index(process.env.PINECONE_INDEX);
  console.log(process.env.PINECONE_INDEX)
  
  const records = [
    {
      id: String(id),
      values: embedding,
      metadata: metaData,
    },
  ];

  // const pineconeResonce = await index.upsert(records);
  const ns = index.namespace(namespace);
  // console.log("pineconeResonce", pineconeResonce);

  const pineconeResonce = await ns.upsert(records);
  console.log("pineconeResonce", pineconeResonce);
}

// search pinecone
// make chunks with iteration
// read docs
// search top 5 /10
