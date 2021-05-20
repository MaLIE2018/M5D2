import express  from 'express';
import { writeImage } from './../fs/fs-tools.js';
import multer from "multer"

const fRouter = express.Router()


fRouter.post("/:id/uploadAvatar",multer().single("authorAvatar"), 
async (req, res, next) => {
  try {
    console.log(req.header)
    await writeImage(`authors/${req.params.id}.jpg`, req.file.buffer)
    res.status(200).send()
    
  } catch (err) {
    console.log(err)
    next(err)
  }
  

})

fRouter.post("/:id/uploadCover",multer().single("blogPostCover"),
async (req, res, next) => {
  try {
    await writeImage(`blogPosts/${req.params.id}.jpg`, req.file.buffer)
    res.status(200).send()
    
  } catch (error) {
    console.log(error)
  }

})




export default fRouter 

