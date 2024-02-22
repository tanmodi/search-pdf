// import multer from "multer";
// // import { uploadData } from "./controller/upload.js";
// // import { upload } from "./middleware/mutler.js";
// import cors from "cors";

// import express from "express";
// const app = express();
// app.use(cors({origin: 'http://localhost:3000'}));
// app.get("/pdf", (req, res) => {
//   const data = uploadData();
//   res.send(data);
// });

// // const uploadPdf = upload({ dest: "uploads/" });
// // const uploadPdf = upload(req, { dest: "uploads/" });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./resources_for_files")
//   },
//   filename: function (req, file, cb) {
    
//     cb(null, file.originalname)
//   }
// })

// const upload = multer({ storage });
// app.post("/api/upload", upload.single('file'), (req, res) => {
//   const { file, body } = req;
//   if (file && body) {
//     const { name } = body;
//     const { originalname, mimetype, size } = file;
//     console.log(
//       `Received file from ${name}: ${originalname}, ${mimetype}, ${size} bytes`
//     );
//     // do something with the file, such as saving, processing, etc.
//     res.status(200).send("File uploaded successfully");
//   } else {
//     res.status(400).send("No file or name received");
//   }
// });

// app.listen(3500, () => {
//   console.log("Server listening on port 3500");
// });


import multer from "multer";
import { uploadData } from "./controller/upload.js";
import cors from "cors";
import express from "express";
const app = express();
app.use(cors({origin: 'http://localhost:3000'}));
app.get("/pdf", (req, res) => {
  const data = uploadData();
  res.send(data);
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./resources_for_files")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage });

app.post("/api/upload", upload.single('file'), (req, res) => {
  const { file, body } = req;
  if (file && body) {
    const { name } = body;
    const { originalname, mimetype, size } = file;
    console.log(
      `Received file from ${name}: ${originalname}, ${mimetype}, ${size} bytes`
    );
    // do something with the file, such as saving, processing, etc.
    const pdfStatus =  async () => {
      const data = await uploadData(file.originalname, name);
      return data
    }
    res.status(200).send(pdfStatus());
  } else {
    res.status(400).send("No file or name received");
  }
});

app.post("/api/search", (req, res) => {

  const { username, question } = req.body;
  res.send("username  question");    
})
const port = 3500
app.listen(port, () => {
 console.log(`Server listening on port ${port}`);
});

