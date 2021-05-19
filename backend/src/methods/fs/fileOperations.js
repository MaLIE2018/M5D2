import fs from "fs";

export const getItems = filePath => JSON.parse(fs.readFileSync(filePath))


export const writeItems = (filePath,data) => 
fs.writeFileSync(filePath, JSON.stringify(data))