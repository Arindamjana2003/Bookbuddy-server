import express from "express";

import { validate } from "../middlewares/validate.middleware.js";
import { isAuthenticate } from "../middlewares/authentication.middleware.js";
import booksValidation from "../validations/books.validation.js";
import bookController from "../controller/book.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router
    .post(
        "/",
        upload.fields([
            { name: "pdfFile", maxCount: 1 },
            { name: "coverImage", maxCount: 1 },
        ]),
        isAuthenticate,
        // validate(booksValidation.create),
        bookController.create
    )
    .get("/", isAuthenticate, bookController.fetch)
    .get("/:categoryId", isAuthenticate, bookController.fetchByCategory)
    .patch(
        "/:bookId",
        upload.single("book"),
        validate(booksValidation.update),
        isAuthenticate,
        bookController.update
    )
    .delete(
        "/:bookId",
        validate(booksValidation.delete),
        isAuthenticate,
        bookController.delete
    )
    .patch(
        "ratting/:bookId",
        validate(booksValidation.ratting),
        isAuthenticate,
        bookController.ratting
    )
    .patch("/like/:bookId", isAuthenticate, bookController.like);
// .get("/search/:name", isAuthenticate, bookController.search)

export const bookRouter = router;
