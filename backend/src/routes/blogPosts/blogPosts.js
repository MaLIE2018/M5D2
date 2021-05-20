import express from 'express';
import {nanoid} from "nanoid"
import { getItems, writeItems,getFilePath} from '../../methods/fs/fs-tools.js';
import createError from 'http-errors'
import { checkBlogPostSchema, checkValidationResult } from '../../methods/validation/validations.js';

const bpRouter = express.Router();

const filePath = getFilePath("blogPosts.json")

bpRouter.get("/", async (req, res, next) =>{  
      try { 
      let BlogPosts = await getItems(filePath)
      if(req.query.title){
        const filteredPosts = BlogPosts.filter(post => 
          post.hasOwnProperty("title") && post.title.toLowerCase()
          .includes(req.query.title.toLowerCase()))
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