// import express from "express"
// import bodyParser from "body-parser"

// import corsConfig from "./src/config/cors.config.js"
// import { todoRouter } from "./src/routes/todo.routes.js"
// import { categoriRouter } from "./src/routes/categories.routes.js"
// import { userRouter } from "./src/routes/user.routes.js"
// import { cloudinaryConfig } from "./src/config/cloudinary.config.js"

// import 'dotenv/config'
// import { dbConnection } from "./src/config/database.config.js"
// import { blogRouter } from "./src/routes/blogs.routes.js"


// const server = express()
// cloudinaryConfig() 
// server.use(corsConfig)
// server.use(bodyParser.json({ limit: "50mb" }))
// server.use(express.json({ limit : "50mb"}))
// server.use(bodyParser.urlencoded( { limit : "50mb" , extended : true }) )

// // all routes 

// server.use('/api/v1/todo' , todoRouter)
// server.use('/api/v1/categories' , categoriRouter)
// server.use("/api/v1/user" , userRouter)
// server.use("/api/v1/blog" , blogRouter )

// server.get("/" , (req , res)=>{
//      console.log("application running");
//      res.send("application is run ")
// })


// export default server 