import { UserService } from "../services/user.service.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { sendResponse } from "../utils/response.handler.js";

export const createUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body);
        return sendResponse(res, {
            status: HTTP_STATUS.OK,
            data: user,
            success: true,
            message: "Verification code sent to your email",
        });
    } catch (error) {
        console.error("--------------", error);
        sendResponse(res, {
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message || RESPONSE_MESSAGES.INTERNAL_ERROR,
            error: error.message,
        });
    }
};

export const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await UserService.loginUser(email, password);

        return sendResponse(res, {
            status: HTTP_STATUS.OK,
            data: result,
            success: true,
            message: "User Logged in successfully.",
        });
    } catch (error) {
        sendResponse(res, {
            status: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
        });
    }
};

export const sendOtpForVerifyAccount = async (req, res) => {
    try {
        await UserService.sendOtpForVerification(req.body.email);
        sendResponse(res, {
            status: HTTP_STATUS.OK,
            success: true,
            message: "OTP sent successfully.",
        });
    } catch (error) {
        sendResponse(res, {
            status: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
        });
    }
};

export const VerifyOtpWithExpiry = async (req, res) => {
    try {
        const user = await UserService.verifyOtp(req.body.otp);
        sendResponse(res, {
            status: HTTP_STATUS.OK,
            success: true,
            message: "OTP verify successfully.",
        });
    } catch (error) {
        sendResponse(res, {
            status: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
        });
    }
};

export const updateUserProfilePic = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await UserService.changeProfilePic(_id, req.file);
        sendResponse(res, {
            status: HTTP_STATUS.OK,
            success: true,
            message: "User updated successfully.",
            data: user,
        });
    } catch (error) {
        sendResponse(res, {
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Failed to update user.",
            error,
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await UserService.getUserById(id);
        sendResponse(res, {
            status: HTTP_STATUS.OK,
            success: true,
            message: "User fetched successfully.",
            data: user,
        });
    } catch (error) {
        sendResponse(res, {
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message,
            error,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await UserService.deleteUser(id);
        sendResponse(res, {
            status: HTTP_STATUS.OK,
            success: true,
            message: "User deleted successfully.",
        });
    } catch (error) {
        sendResponse(res, {
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Failed to delete user.",
            error,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await UserService.updateUser(id, req.body);
        sendResponse(res, {
            status: HTTP_STATUS.OK,
            success: true,
            message: "User updated successfully.",
            data: user,
        });
    } catch (error) {
        sendResponse(res, {
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Failed to update user.",
            error,
        });
    }
};
