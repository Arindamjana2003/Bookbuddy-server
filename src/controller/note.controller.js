import { Notes } from "../model/note.model.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { sendResponse } from "../utils/response.handler.js";
import notesService from "../services/note.service.js"

class NoteController {


    async createNote(req , res){
        try {
            const note = await notesService.createNote(req.body);
            console.info("note created")
            return sendResponse(res , { status:HTTP_STATUS.CREATED , message : RESPONSE_MESSAGES.NOTE_CREATED , success:true , data:note })
        } catch (error) {
            return sendResponse(res , { status:HTTP_STATUS.INTERNAL_SERVER_ERROR , success:false , message:RESPONSE_MESSAGES.INTERNAL_ERROR , error : error  })
          
        }
    }



    async deleteNote(req , res) {
        try {
            const note = await notesService.deleteNote(req.params);
            console.info("note deleted")
            return sendResponse(res , { status:HTTP_STATUS.DELETED , message : RESPONSE_MESSAGES.NOTE_DELETED , success:true , data:note })
        } catch (error) {
            return sendResponse(res , { status:HTTP_STATUS.INTERNAL_SERVER_ERROR , success:false , message:RESPONSE_MESSAGES.INTERNAL_ERROR , error : error  })
          
        }
    }



    async editNote(req , res) {
        try {
            const note = await notesService.editNote(req.body);
            console.info("note edited")
            return sendResponse(res , { status:HTTP_STATUS.EDITED , message : RESPONSE_MESSAGES.NOTE_EDITED , success:true , data:note })
        } catch (error) {
            return sendResponse(res , { status:HTTP_STATUS.INTERNAL_SERVER_ERROR , success:false , message:RESPONSE_MESSAGES.INTERNAL_ERROR , error : error  })
          
        }
    }


    async fetchNote(req , res) {
        try {
            const note = await notesService.fetchNote(req.params);
            console.info("note fetched")
            return sendResponse(res , { status:HTTP_STATUS.FETCHED , message : RESPONSE_MESSAGES.NOTE_FETCHED , success:true , data:note })
        } catch (error) {
            return sendResponse(res , { status:HTTP_STATUS.INTERNAL_SERVER_ERROR , success:false , message:RESPONSE_MESSAGES.INTERNAL_ERROR , error : error  })
          
        }
    }

}

export default new NoteController();



