import express from 'express'
import { verificationController,authController } from '../controllers/index.js';
import * as validations from '../middleware/validations/authValidation.js';


const initAuthRoutes = ()=>{
  const authRoutes = express.Router();
  authRoutes.post('/send-verification-code', verificationController.sendVerificationCode);
  authRoutes.post('/verify-code', verificationController.verifyCode);
  authRoutes.post('/user/signup',authController.signup);
  authRoutes.post('/user/signin',validations.signin,authController.signin)

  // todo : more routes to come.

  return authRoutes;
}



export default initAuthRoutes;
