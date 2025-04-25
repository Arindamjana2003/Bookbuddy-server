import express from "express"
import { validate } from "../middlewares/validate.middleware.js"
import categoriesValidation from "../validations/categories.validation.js"
import { isAuthenticate } from "../middlewares/authentication.middleware.js"
import categoriesController from "../controller/categories.controller.js"


const router = express.Router()

router
   .post("/" , validate(categoriesValidation.create) , isAuthenticate , categoriesController.createCatrgories )
   .patch("/:categoriesId",validate(categoriesValidation.update),isAuthenticate,categoriesController.updateCategories)
   .delete("/:categoriesId",validate(categoriesValidation.delete),isAuthenticate , categoriesController.deleteCategories)
   .get("/",validate(categoriesValidation.get),isAuthenticate,categoriesController.fetchAllCategoriesList)
   


export  const  categoriRouter = router 



// import express from "express"
// import { validate } from "../middlewares/validate.middleware.js"
// import categoriesValidation from "../validations/categories.validation.js"
// import { isAuthenticate } from "../middlewares/authentication.middleware.js"
// import categoriesController from "../controller/categories.controller.js"


// const router = express.Router()

// router
//    .post("/" , validate(categoriesValidation.create) , isAuthenticate , categoriesController.createCatrgories )
//    .patch("/:categoriesId",validate(categoriesValidation.update),isAuthenticate,categoriesController.updateCategories)
//    .delete("/:categoriesId",validate(categoriesValidation.delete),isAuthenticate,(categoriesValidation.delete),isAuthenticatecategoriesController.deleteCategories)
//    .get("/",validate(categoriesValidation.get),isAuthenticate,categoriesController.fetchAllCategoriesList)
   


// export  const  categoriRouter = router