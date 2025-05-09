import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { sendResponse } from "../utils/response.handler.js";
import notesService from "../services/note.service.js";

class NoteController {
    async createNote(req, res) {
        try {
            const note = await notesService.createNotes(req.body, req.user);
            console.info("note created");
            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.NOTE_CREATED,
                success: true,
                data: note,
            });
        } catch (error) {
            console.log(error);

            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                success: false,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                error: error,
            });
        }
    }

    async deleteNote(req, res) {
        try {
            const note = await notesService.deleteNote(req.params);
            console.info("note deleted");
            return sendResponse(res, {
                status: HTTP_STATUS.DELETED,
                message: RESPONSE_MESSAGES.NOTE_DELETED,
                success: true,
                data: note,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                success: false,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                error: error,
            });
        }
    }

    async editNote(req, res) {
        try {
            const note = await notesService.editNote(req.body);
            console.info("note edited");
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "Note updated",
                success: true,
                data: note,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                success: false,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                error: error,
            });
        }
    }

    async fetchNote(req, res) {
        try {
            const note = await notesService.fetch(req.user);
            console.info("note fetched");
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "Note fetched",
                success: true,
                data: note,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                success: false,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                error: error,
            });
        }
    }

    async fetchNoteById(req, res) {
        try {
            const note = await notesService.fetchById(req.params);
            console.info("note fetched by id");
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "Note fetched",
                success: true,
                data: note,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                success: false,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                error: error,
            });
        }
    }
}

export default new NoteController();
