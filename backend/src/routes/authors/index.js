import express from 'express';
import fs from "fs";
import {fileURLToPath} from "url"
import {dirname, join} from "path"
import { nanoid } from 'nanoid'

const ARouter = express.Router();
const filePath = join(dirname(fileURLToPath(import.meta.url)),'authors.json')
const fileContent = fs.readFileSync(filePath)

ARouter.get('/', (req, res) => {
  console.log("test")
  res.send(200,fileContent)
})
ARouter.get('/:id', (req, res) => {
  const id = req.params.id
  res.status(200).send(JSON.parse(fs.readFileSync(filePath)).filter(a =>a._id === id))
})
ARouter.post('/', (req, res) => {
  const author = req.body
  
  let authors = JSON.parse(fileContent)
  if(!authors.some(a =>a.email === author.email)){
    author._id = nanoid()
    authors.push(author)
    fs.writeFileSync(filePath, JSON.stringify(authors))
    res.send(201)
  }else{
    res.send(200, "Sorry, the email already exists!")
  }
  
})
ARouter.put('/:id', (req, res) => {
  const author = req.body
  const id = req.params.id
  author._id = id
  let authors = JSON.parse(fileContent).filter(a => a._id !== id)
  authors.push(author)
  fs.writeFileSync(filePath, JSON.stringify(authors))
  res.send(201)
})
ARouter.delete('/:id', (req, res) => {
  const id = req.params.id
  let authors = JSON.parse(fileContent).filter(a => a._id !== id)
  fs.writeFileSync(filePath, JSON.stringify(authors))
  res.send(200)
})


export default ARouter;