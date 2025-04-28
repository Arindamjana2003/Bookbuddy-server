import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import blogService from "../services/blog.service.js";

import { sendResponse } from "../utils/response.handler.js";

class BlogController {
    async create(req, res) {
        try {
            console.log(req.user);

            const data = await blogService.create(req.body, req.user);
            console.info("categories created");
            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: "Blog created successfully",
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

    async update(req, res) {
        try {
            const data = await blogService.update(
                req.body,
                req.params,
                req.user
            );
            console.info("categories created");
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.CETAGORIES_CREATE_SUCCESS,
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
            const data = await blogService.delete(req.params);
            console.info("categories created");
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "Blog deleted successfully",
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
            const data = await blogService.fetch();
            console.info("categories created");
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "Blog fetched successfully",
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

    async fetchDetails(req, res) {
        try {
            const { blogId } = req.params;
            const data = await blogService.fetchDetails(blogId);
            console.info("categories created");
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: "Blog Details fetched successfully",
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
}

export default new BlogController();
