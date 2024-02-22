import { parsePdf } from "../utils/pdf_parse.utils.js";
import { sendPineconeEmbedding } from "../utils/pinecone_send.utils.js";
import { getFunctionCall } from "../utils/openai_functioncalling.utils.js";
import { getEmbedding } from "../utils/openai_embedding.utils.js";

export async function uploadData(filename, namespace) {
  try {
    const pdfPath = `./resources_for_files/${filename}.pdf`;
    const text = await parsePdf(pdfPath);
    console.log("data", text);

    let words = text.split(/\s+/);
    let chunks = [];
    console.log("words", words.length);
    for (let i = 0; i < words.length; i += 50) {
      const subChunks = words.slice(i, i + 50);
      const chunk = subChunks.join(" ");
      chunks.push(chunk);
    }
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embeddingResonse = await getEmbedding(chunk);
      const metaData = {
        text: chunk,
      };
      console.log("embeddingResonse", embeddingResonse);
      console.log("metaData", metaData);
      const id = Date.now().toString();
      // const namespace = namespace;
      const embedding = embeddingResonse.data[0].embedding;
      // console.log("embedding is ", embedding);
      console.log(Array.isArray(embedding));
      await sendPineconeEmbedding(namespace, id, embedding, metaData);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// uploadData()
