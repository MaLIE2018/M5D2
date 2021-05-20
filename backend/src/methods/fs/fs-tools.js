import fs from "fs-extra"
import { fileURLToPath } from 'url';
import {dirname, join} from 'path';


const dataFilesPath = join(dirname(fileURLToPath(import.meta.url)), "../../data")


export const publicFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../../../public/img")
export const getFilePath = (fileName) => join(dataFilesPath, fileName)
export const getItems = async filePath => await fs.readJson(filePath)
export const writeItems = async (filePath,data) => 
await fs.writeJson(filePath,data)
export const writeImage = async (filePathEnd, data) => await fs.writeFile(join(publicFolderPath,filePathEnd), data)
