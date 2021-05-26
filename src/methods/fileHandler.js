import express  from 'express';
import { getFilePath, getItemsExceptOneWithIdFromFile, getItemsFromFile, writeImage, writeItems } from './fs-tools.js';
import multer from "multer"
import {extname} from "path"
import {v2 as cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"

const fRouter = express.Router()

const filePath = getFilePath("blogPosts.json")


const cloudinaryStorage = new CloudinaryStorage({
	cloudinary,
params: {
	folder: "BlogPosts",
}
})


fRouter.post("/:id/uploadAvatar",multer ({storage: cloudinaryStorage }).single("authorAvatar"), 
async (req, res, next) => {
  try {
    let blogPosts = await getItemsExceptOneWithIdFromFile(filePath, req.params.id)
    let blogPost = await getItemsFromFile(filePath, req.params.id)
    let newFileName = `${req.params.id}${extname(req.file.originalname)}`
    blogPost[0].author.avatar = process.env.BACKEND_DEV_URL + `/img/authors/${newFileName}`
    blogPosts.push(blogPost[0])
    await writeItems(filePath, blogPosts)
    await writeImage(`authors/${newFileName}`, req.file.buffer)
    res.status(200).send({"upload":"ok"})
  } catch (error) {
    console.log(error)
    next(error)
  }
  

})

fRouter.post("/:id/uploadCover",multer ({storage: cloudinaryStorage }).single("blogPostCover"),
async (req, res, next) => {
  try {
    let blogPosts = await getItemsExceptOneWithIdFromFile(filePath, req.params.id)
    let blogPost = await getItemsFromFile(filePath, req.params.id)
    let newFileName = `${req.params.id}${extname(req.file.originalname)}`
    blogPost[0].cover = process.env.BACKEND_DEV_URL + `/img/blogPosts/${newFileName}`
    blogPosts.push(blogPost[0])
    await writeItems(filePath, blogPosts)
    await writeImage(`blogPosts/${req.params.id}${extname(req.file.originalname)}`, req.file.buffer)
    res.status(200).send({"upload":"ok"})
    
  } catch (error) {
    console.log(error)
    next(error)
  }

})




export default fRouter 

