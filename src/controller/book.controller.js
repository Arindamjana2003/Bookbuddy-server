import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import bookService from "../services/book.service.js";
import { sendResponse } from "../utils/response.handler.js";

class BookController {
  async create(req, res) {
     req.user = {
      id: "680b27dd1a1d35fd02b279aa",
      email: "test@test.com",
      role: "user",
     }

    try {
      const data = await bookService.create(req.body, req.file ,  req.user);
      console.info("Book created");
      return sendResponse(res, {
        status: HTTP_STATUS.CREATED,
        message: RESPONSE_MESSAGES.BOOK_CREATE_SUCCESS,
        success: true,
        data: data,
      });
    } catch (error) {
        console.log(error , "error");
        
      return sendResponse(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        message: RESPONSE_MESSAGES.INTERNAL_ERROR,
        error: error,
      });
    }
  }

  async update(req, res) {
    try {
      const data = await bookService.update(req.body, req.params, req.user, req.file);
      console.info("Book updated");
      return sendResponse(res, {
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.BOOK_UPDATE_SUCCESS,
        success: true,
        data: data,
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

  async delete(req, res) {
    try {
      const data = await bookService.delete(req.params);
      console.info("Book deleted");
      return sendResponse(res, {
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.BOOK_DELETE_SUCCESS,
        success: true,
        data: data,
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

  async fetch(req, res) {
    try {
      const data = await bookService.fetch();
      console.info("Books fetched");
      return sendResponse(res, {
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.BOOK_FETCH_SUCCESS,
        success: true,
        data: data,
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

  async ratting(req, res) {
    try {
      const data = await bookService.ratting(req.body, req.params, req.user);
      console.info("Book ratting");
      return sendResponse(res, {
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.BOOK_RATTING_SUCCESS,
        success: true,
        data: data,
      });
    }
    catch (error) {
      return sendResponse(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        message: RESPONSE_MESSAGES.INTERNAL_ERROR,
        error: error,
      });
    }
  } 

  async like(req, res) {
    try {
      const data = await bookService.like(req.params, req.user);
      console.info("Book liked");
      return sendResponse(res, {
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.BOOK_LIKE_SUCCESS,
        success: true,
        data: data,
      });
    }
    catch (error) {
      return sendResponse(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        message: RESPONSE_MESSAGES.INTERNAL_ERROR,
        error: error,
      });
    }
  }

}



export default new BookController();
