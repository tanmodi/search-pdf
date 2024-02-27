import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

export async function getTranscription(filePath) {
  dotenv.config();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: "whisper-1",
  });

  console.log(transcription.text);
  return transcription.text;
}
