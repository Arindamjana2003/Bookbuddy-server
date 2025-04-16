import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';

import { createUser, deleteUser, logInUser, sendOtpForVerifyAccount, updateUser, VerifyOtpWithExpiry } from '../controller/user.controller.js';
import userValidation from '../validations/user.validation.js';
import { isAuthenticate } from '../middlewares/authentication.middleware.js';

const router = express.Router();

router
  .post('/create', validate(userValidation.createUser), createUser)
  .post('/login', validate(userValidation.login), logInUser)
  .post('/send-otp', validate(userValidation.sendOtp), sendOtpForVerifyAccount)
  .post("/verify-otp", validate(userValidation.verifyOtp),  VerifyOtpWithExpiry)
  .post('/profile-pic-change' , validate(userValidation.changeProfilePic) , isAuthenticate , )
  .patch("/" , isAuthenticate , updateUser)
  .delete("/" , isAuthenticate , deleteUser)

export const userRouter = router;
