import express from 'express';
import {fileURLToPath} from "url";
import {dirname, join} from "path"
import {nanoid} from "nanoid"
import { validationResult } from "express-validator"
import { getItems, writeItems} from '../../methods/fs/fileOperations.js';
import createError from 'http-errors'
const bpRouter = express.Router();
const filePath = join(dirname(fileURLToPath(import.meta.url)), "blogPosts.json")
import { blogPostValidation } from './../../methods/validation/validations.js';


bpRouter.get("/", (req, res, next) =>{
  const errors = validationResult(req)  
  
  try {
      if(req.query.title){
        console.log(req.query.title)
        const filteredPosts = getItems(filePath).filter(post => 
          post.hasOwnProperty("title") && post.title.toLowerCase().includes(req.query.title.toLowerCase()))
        res.status(200).send(filteredPosts)
      }
      res.status(200).send(getItems(filePath))
    } catch (err) {
      console.log(error)
      next(error)
    }
})
bpRouter.get("/:id", ( req, res, next) =>{
  try {
    let blogPost = getItems(filePath).filter(a => a._id === req.params.id)
    console.log('blogPost:', blogPost)
    if(blogPost.length !==0){
      res.status(200).send(blogPost)
    } else {
      next(createError(404, {message:`The blogPost with ${req.params.id} is not found`}))
    }
  } catch (err) {
    console.log(error)
    next(error)
  }
})
bpRouter.post("/",blogPostValidation, ( req, res, next) =>{
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      next(createError(400, {errorList: errors}))
    } else{
      let blogPost = {...req.body, _id: nanoid(), createdAt: new Date()}
      let blogPosts = getItems(filePath)
      blogPosts.push(blogPost)
      writeItems(filePath, blogPosts)
      res.status(201).send(blogPost._id)
    }
    
  } catch (error) {
    console.log(error)
    next(error)
  }
})
bpRouter.put("/:id",blogPostValidation, (req, res, next) =>{
  try {
    if(getItems(filePath).some(post => post._id === req.params.id)){
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        next(createError(400, {errorList: errors}))
      } else {
        let blogPosts = getItems(filePath).filter(a => a._id !== req.params.id)
        let blogPost = {...req.body, _id: req.params.id, updatedAt: new Date()}
        blogPosts.push(blogPost)
        writeItems(filePath, blogPosts)
        res.status(200).send(blogPost)
        }
    } else{
      next(createError(404, {message:`The blogPost with ${req.params.id} is not found`}))
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})
bpRouter.delete("/:id", (req, res, next) =>{
  try {
    if(getItems(filePath).some(post => post._id === req.params.id)){
      let blogPosts = getItems(filePath).filter(a => a._id !== req.params.id)
      writeItems(filePath, blogPosts)
      res.status(204).send()
    } else{
      next(createError(404, {message:`The blogPost with ${req.params.id} is not found`}))
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default bpRouter