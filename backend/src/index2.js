import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("It's working!");
});

app.listen(3500, () => {
  console.log("Server listening on port 3500");
});

app.post("/api/search", (req, res) => {

  const { query } = req.body;
  res.send("query");    
})