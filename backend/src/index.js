import { uploadData } from "controller/upload.js";
const app = express()

app.get("/pdf", (req, res) => {
    const data = uploadData();
    res.send(data)
})

