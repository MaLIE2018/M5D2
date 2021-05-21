import express from 'express';
import ARouter from "../routes/authors/authors.js"
import bpRouter from '../routes/blogPosts/blogPosts.js';
import fRouter from '../methods/fileUpload/fileHandler.js'
import { notFoundHandler,badRequestHandler,catchAllHandler, forbiddenHandler } from './../methods/err/errorHandlers.js';
import {publicFolderPath}  from "../methods/fs/fs-tools.js"
import  createError from 'http-errors';
import cors from "cors"
const port = 3001;

const app = express();

/*Global Middleware */
app.use(express.static(publicFolderPath))
app.use(express.json())
app.use(cors({
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}))
/*Routes */
app.use("/authors",ARouter, fRouter)
app.use("/blogPosts", bpRouter, fRouter)

/* Error Middleware */
app.use(notFoundHandler)
app.use(badRequestHandler)
app.use(catchAllHandler)
app.use(forbiddenHandler)
app.use((req,res,next)=>{
  if(!req.route && !req.headersSent){
    res.send(createError(404,{message:"The route is not implemented"}))
  }
})

app.listen(port, () => {
  console.log("Server is running")
})