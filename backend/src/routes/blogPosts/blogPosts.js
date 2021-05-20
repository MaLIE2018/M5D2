import express from 'express';
import {fileURLToPath} from "url";
import {dirname, join} from "path"
import {nanoid} from "nanoid"
import { getItems, writeItems} from '../../methods/fs/fileOperations.js';
import createError from 'http-errors'
const bpRouter = express.Router();
const filePath = join(dirname(fileURLToPath(import.meta.url)), "blogPosts.json")
import { checkBlogPostSchema, checkValidationResult } from './../../methods/validation/validations.js';


bpRouter.get("/", async (req, res, next) =>{  
  try {
      let BlogPosts = await getItems(filePath)
      if(req.query.title){
        const filteredPosts = BlogPosts.filter(post => 
          post.hasOwnProperty("title") && post.title.toLowerCase().includes(req.query.title.toLowerCase()))
        res.status(200).send(filteredPosts)
      }
      res.status(200).send(BlogPosts)
    } catch (err) {
      console.log(err)
      next(err)
    }
})
bpRouter.get("/:id", async ( req, res, next) =>{
  try {
    let blogPosts = await getItems(filePath)
    let reqPost = blogPosts.filter(a => a._id === req.params.id)
    if(reqPost.length !==0){
      res.status(200).send(reqPost)
    } else {
      next(createError(404, {message:`The blogPost with ${req.params.id} is not found`}))
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})
bpRouter.post("/",checkBlogPostSchema,checkValidationResult, async ( req, res, next) =>{
  try {
      let blogPosts = await getItems(filePath)
      let blogPost = {...req.body, _id: nanoid(), createdAt: new Date()}
      blogPosts.push(blogPost)
      writeItems(filePath, blogPosts)
      res.status(201).send(blogPost._id)
  } catch (err) {
    console.log(err)
    next(err)
  }
})
bpRouter.put("/:id",checkBlogPostSchema,checkValidationResult, async (req, res, next) =>{
  try {
    let blogPosts = await getItems(filePath)
    if(blogPosts.some(post => post._id === req.params.id)){
        let blogPosts = blogPosts.filter(a => a._id !== req.params.id)
        let blogPost = {...req.body, _id: req.params.id, updatedAt: new Date()}
        blogPosts.push(blogPost)
        writeItems(filePath, blogPosts)
        res.status(200).send(blogPost)
    } else{
      next(createError(404, {message:`The blogPost with ${req.params.id} is not found`}))
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})
bpRouter.delete("/:id", async (req, res, next) =>{
  try {
    let blogPosts = await getItems(filePath)
    if(blogPosts.some(post => post._id === req.params.id)){
      blogPosts.filter(a => a._id !== req.params.id)
      writeItems(filePath, blogPosts)
      res.status(204).send()
    } else{
      next(createError(404, {message:`The blogPost with ${req.params.id} is not found`}))
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

export default bpRouter