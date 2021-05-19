import express from 'express';
import cors from "cors"

import ARouter from "../routes/authors/authors.js"
import bpRouter from '../routes/blogPosts/blogPosts.js';
import { notFoundHandler,badRequestHandler,catchAllHandler, forbiddenHandler } from './../methods/err/errorHandlers.js';
import { createError } from 'http-errors';

const app = express();
const port = 3001;


/*Global Middleware */

app.use(cors())
app.use(express.json())

/*Routes */
app.use("/authors",ARouter)
app.use("/blogPosts", bpRouter)

/* Error Middleware */
app.use(notFoundHandler)
app.use(badRequestHandler)
app.use(catchAllHandler)
app.use(forbiddenHandler)
app.use((req,res,next)=>{
  if(!req.route && !req.headersSent){
    next(createError(404,{message:"The route is not implemented"}))
  }
})
app.listen(port, () => {
  console.log("Server is running")
})