import express from "express"
import { validate } from "../middlewares/validate.middleware.js"
import categoriesValidation from "../validations/categories.validation.js"
import { isAuthenticate } from "../middlewares/authentication.middleware.js"
import categoriesController from "../controller/categories.controller.js"


const router = express.Router()

router
   .post("/" , validate(categoriesValidation.create) , isAuthenticate , categoriesController.createCatrgories )
   


export  const  categoriRouter = router 