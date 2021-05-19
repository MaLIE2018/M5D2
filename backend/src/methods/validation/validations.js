import {body} from "express-validator"

//Validation chain
export const blogPostValidation = 
[body("title")
.exists().withMessage("Title is mandatory"),
body("category")
.exists().withMessage("Category is mandatory"),
body("content")
.exists().withMessage("Content is mandatory")
]


// export const blogPostValidation = 
// [body("title")
// .exists().withMessage("Title is mandatory"),
// body("readTime")
// .exists().withMessage("readTime is mandatory"),
// body("category")
// .exists().withMessage("Category is mandatory"),
// body("cover")
// .exists().withMessage("Cover is mandatory"),
// body("author")
// .exists().withMessage("Author is mandatory"),
// body("content")
// .exists().withMessage("Content is mandatory")
// ]


export const authorValidator = [body("")]