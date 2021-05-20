import fs from "fs-extra"

export const getItems = async filePath => await fs.readJson(filePath)
export const writeItems = async (filePath,data) => await fs.writeJson(filePath,data)
