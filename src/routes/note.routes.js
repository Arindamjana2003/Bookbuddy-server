import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { isAuthenticate } from "../middlewares/authentication.middleware.js";
import noteController from "../controller/note.controller.js";
import notesValidation from "../validations/notes.validation.js";

const router = express.Router();

router
    .post(
        "/",
        validate(notesValidation.create),
        isAuthenticate,
        noteController.createNote
    )
    .get("/", isAuthenticate, noteController.fetchNote)
    .get("/:noteId", isAuthenticate, noteController.fetchNoteById)
    //  .patch(
    //      "/:noteId",
    //      validate(notesValidation.update),
    //      isAuthenticate,
    //      noteController.pa
    //  )
    .delete(
        "/:noteId",
        validate(notesValidation.delete),
        isAuthenticate,
        noteController.deleteNote
    );

export const notesRouter = router;
