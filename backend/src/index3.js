import multer from "multer";
// import { uploadData } from "./controller/upload.js";
import cors from "cors";

import express from "express";
const app = express();
// app.use(cors({origin: 'http://localhost:3000'}));


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
    res.status(200).send("File uploaded successfully");
  } else {
    res.status(400).send("No file or name received");
  }
});
const port = 3500
app.listen(port, () => {
 console.log(`Server listening on port ${port}`);
});
