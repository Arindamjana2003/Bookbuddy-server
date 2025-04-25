import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import noteValidation from '../validations/note.validation.js';
import { isAuthenticate } from '../middlewares/authentication.middleware.js';
import noteController from '../controller/note.controller.js';


const router = express.Router();

router
   .post("/" , validate(noteValidation.create) , isAuthenticate , noteController.createNote )
   .get("/" , isAuthenticate , noteController.fetchNote)
   .patch("/:noteId" , validate(noteValidation.update) , isAuthenticate , noteController.createNote )
   .delete("/:noteId" , validate(noteValidation.delete) , isAuthenticate , noteController.createNote)
      
   

    export  const  notesRouter = router