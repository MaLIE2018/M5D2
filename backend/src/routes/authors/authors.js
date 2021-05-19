import express from 'express';
import {fileURLToPath} from "url"
import {dirname, join} from "path"
import { nanoid } from 'nanoid'
import {getItems, writeItems} from '../../methods/fs/fileOperations.js'
import {validationResult} from "express-validator"
const ARouter = express.Router();
const filePath = join(dirname(fileURLToPath(import.meta.url)),'authors.json')

// ********************Requests******************************
ARouter.get('/', (req, res, next) => {
  try {
    res.status(200).send(getItems(filePath))
  } catch (error) {
    next(error)
  }
  
})
ARouter.get('/:id', (req, res) => {
  try {
    res.status(200).send(getItems(filePath).filter(a =>a._id === req.params.id))
  } catch (error) {
    
  }
})

ARouter.post('/', (req, res) => {
  try {
    let author = req.body
    let authors = getItems(filePath)
    if(!authors.some(a =>a.email === author.email)){
      author = {...author, _id:nanoid(), createdAt: new Date()}
      authors.push(author)
      writeItems(filePath, authors)
      res.status(201).send()
    }else{
      res.status(200).send("Sorry, the email already exists!")
    }
  } catch (error) {
    
  }
  
  
})
// Validator as Middleware here
ARouter.put('/:id', (req, res) => {
  try {
    // const error validationResult(req)
    // if(!error.isEmpty())  next(createError(400, errorList:{errors}))
    const author = {...req.body, _id: id}
    let authors = getItems(filePath).filter(a => a._id !== req.params.id)
    authors.push(author)
    writeItems(filePath, authors)
    res.status(201)
  } catch (error) {
    
  }
 
})
ARouter.delete('/:id', (req, res) => {
  try {
    let authors = getItems(filePath).filter(a => a._id !== req.params.id)
    writeItems(filePath, authors)
    res.status(204).send()
  } catch (error) {
    
  }
  
})

export default ARouter;