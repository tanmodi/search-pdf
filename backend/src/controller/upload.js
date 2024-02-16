// import { parsePdf } from "../utils/pdf_parse.utils.js";
import { sendPineconeEmbedding } from "../utils/pinecone_send.utils.js";
import { getFunctionCall } from "../utils/openai_functioncalling.utils.js";
import { getEmbedding } from "../utils/openai_embedding.utils.js";

async function uploadData() {
  try {
    // const pdfPath = "resources_for_files/sample.pdf";
    const text = `Tanmay Modi    (+91) 9205875182 •   tanmaymodi64@gmail.com 
    linkedin.com/in/tanmodi • github.com/tanmodi 
  Vaishali, Ghaziabad, UP 201010 
   
  I am a fresh MCA graduate with a passion for front-end development. I have learned HTML, CSS and JS through online 
  courses and personal projects. I have created several websites and web applications that showcase my skills and 
  creativity. I am looking for an opportunity to work with a team of professionals and learn from their experience. 
  Academics 
   
  2021-23 Master of computer application 
  CGPA:  7.06 Dr. A. P. J. Abdul Kalam Technical University , Lucknow 
  2017-20 Bachelor of computer application 
  CGPA:  7.08 Guru Gobind Singh Indraprastha University, New Delhi 
  2017 Class 10+2 
  PERCENTAGE: 70% CBSE 
  2015 Class 10th 
  CGPA: 7 CBSE 
   
  Projects 
   
  Amazon Website Clone 
  • Developed an Amazon website clone using HTML, CSS, and JavaScript 
  • Implemented features such as product display, shopping cart, checkout, and payment. 
  • Ensured responsive design and cross-browser compatibility. 
  • Applied best practices of web development and security. 
  • Created a user-friendly and attractive interface. 
  Conference management system code 
  • Website that provides a comprehensive and efficient solution for organizing, managing, and promoting 
  conferences and similar events. 
  • FRONTEND: HTML, CSS, JS 
  • BACKEND: DJANGO, SQLite, SMS API, E-mail integration (OUTLOOK), Google maps 
   
  Skills 
   
  • LINUX (UBUNTU, FEDORA) 
  • GIT AND GITHUB 
  • HTML 
  • CSS 
  • JAVASCRIPT 
  • REACT JS 
   
   `
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
      console.log("metaData", metaData);
      const id = i;
      const namespace = "pdf";
      const embedding = embeddingResonse.data[0].embedding;
      console.log("embedding is ", embedding);
      console.log(typeof embedding);
      await sendPineconeEmbedding(namespace, id, embedding.toString(), metaData);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

uploadData()
