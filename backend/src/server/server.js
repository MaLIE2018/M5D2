import express from 'express';
import ARouter from "../routes/authors/index.js"
import cors from "cors"
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors())
app.use("/authors",ARouter)

app.listen(port, () => {
  console.log("Server is running")
})