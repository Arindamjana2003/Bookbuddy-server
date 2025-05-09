import express from "express";

import { validate } from "../middlewares/validate.middleware.js";
import { isAuthenticate } from "../middlewares/authentication.middleware.js";
import blogsValidation from "../validations/blogs.validation.js";
import blogController from "../controller/blog.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router
    .post(
        "/",
        // validate(blogsValidation.create),
        isAuthenticate,
        upload.single("file"), // Use multer to handle file upload
        blogController.create
    )
    .get("/", isAuthenticate, blogController.fetch)
    .get("/:blogId", isAuthenticate, blogController.fetchDetails)
    .patch(
        "/:blogId",
        validate(blogsValidation.update),
        isAuthenticate,
        blogController.update
    )
    .delete(
        "/:blogId",
        validate(blogsValidation.delete),
        isAuthenticate,
        blogController.delete
    );

export const blogRouter = router;
