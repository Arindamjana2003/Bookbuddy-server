import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import bookService from "../services/book.service.js";
import { sendResponse } from "../utils/response.handler.js";

class BookController {
    async create(req, res) {
        try {
            const data = await bookService.create(req);
            console.info("Book created");
            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.BOOK_CREATE_SUCCESS,
                success: true,
                data: data,
            });
        } catch (error) {
            console.log(error, "error");

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
            const data = await bookService.update(
                req.body,
                req.params,
                req.user,
                req.file
            );
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

    async fetchByCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const data = await bookService.fetch(categoryId);
            console.info("Category fetched");
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

    async fetchById(req, res) {
        try {
            const { bookId } = req.params;

            const data = await bookService.fetchById(bookId);

            console.info("Books fetched");
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.BOOK_FETCH_SUCCESS || "Book fetched",
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
            const data = await bookService.ratting(
                req.body,
                req.params,
                req.user
            );
            console.info("Book ratting");
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.BOOK_RATTING_SUCCESS,
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
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                success: false,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                error: error,
            });
        }
    }

    async search(req, res) {
        try {
            const { q: query, category, page = 1, limit = 10 } = req.query;

            // Validate inputs
            if (isNaN(page) || page < 1) {
                return sendResponse(res, {
                    status: HTTP_STATUS.BAD_REQUEST,
                    message: "Page must be a positive number",
                    success: false,
                });
            }

            if (isNaN(limit) || limit < 1 || limit > 100) {
                return sendResponse(res, {
                    status: HTTP_STATUS.BAD_REQUEST,
                    message: "Limit must be between 1 and 100",
                    success: false,
                });
            }

            // Perform search
            const { books, pagination } = await bookService.searchBooks({
                query,
                category,
                page: parseInt(page),
                limit: parseInt(limit),
            });

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "Books retrieved successfully",
                success: true,
                data: books,
                pagination,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: "Search failed",
                success: false,
                error: error.message,
            });
        }
    }
}

export default new BookController();
