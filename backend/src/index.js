import { speakSearch } from "./controller/speak.js";
import multer from "multer";
import { uploadData } from "./controller/upload.js";
import cors from "cors";
import express from "express";
import { searchData } from "./controller/search.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.get("/pdf", async (req, res) => {
  // Make route handler async
  const data = await uploadData(); // Wait for uploadData to complete
  res.send(data);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./resources_for_files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  // Make route handler async
  const { file, body } = req;
  if (file && body) {
    const { username } = body;
    const { originalname, mimetype, size } = file;
    console.table({ username, originalname, mimetype, size });
    const data = await uploadData(originalname, username); // Wait for uploadData to complete
    console.log(data);
    res.status(200).send(data); // Send response after uploadData completes
  } else {
    res.status(400).send("No file or name received");
  }
});

app.post("/api/search", async (req, res) => {
  const { username, question } = req.body;
  const data = await searchData(username, question);
  res.send(data || "No answer found");
});

const audioStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./resources_for_files/audio");
    console.log(file.originalname);
  },
  filename: function (req, file, cb) {
    cb(null, req.body.username + file.originalname);
  },
});

const uploadAudio = multer({ storage: audioStorage });

app.post("/api/speak", uploadAudio.single("audio"), async (req, res) => {
  console.log("Received audio file:");
  const { file, body } = req;
  if (file && body) {
    const { username } = body;
    const { originalname, mimetype, size } = file;
    // console.log("Received audio file:", originalname, mimetype, size);
    // console.log("Username:", username);
    const data = await speakSearch(username + originalname, username);
    // res.send(data || "No answer found");
    // Process the uploaded audio file and username as needed
    res.status(200).send(data || "No answer found");
  } else {
    res.status(400).send(false);
  }
});

const port = 3500;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
