import "dotenv/config";

import express from "express";
import bodyParser from "body-parser";
import { dbConnection } from "./src/config/database.config.js";
import corsConfig from "./src/config/cors.config.js";
import { notesRouter } from "./src/routes/note.routes.js";
import { categoriRouter } from "./src/routes/categories.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { cloudinaryConfig } from "./src/config/cloudinary.config.js";
import { blogRouter } from "./src/routes/blogs.routes.js";

import { bookRouter } from "./src/routes/book.routes.js";

const PORT = process.env.PORT || 5000;

console.log(PORT);

dbConnection();

const server = express();
cloudinaryConfig();
server.use(corsConfig);
server.use(bodyParser.json({ limit: "150mb" }));
server.use(express.json({ limit: "150mb" }));
server.use(bodyParser.urlencoded({ limit: "150mb", extended: true }));
server.use(express.urlencoded({ limit:"150mb", extended:true})); 
// all routes

server.use("/api/v1/note", notesRouter);
server.use("/api/v1/categories", categoriRouter);
server.use("/api/v1/user", userRouter);
server.use("/api/v1/blog", blogRouter);
server.use("/api/v1/book", bookRouter);

server.get("/", (req, res) => {
    console.log("application running");
    res.send("application is run ");
});
server.listen(PORT, () => {
    console.log(" your server is running successfully ", PORT);
});

export default server;
