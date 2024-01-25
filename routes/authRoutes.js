import express from 'express'
import { verificationController,authController } from '../controllers/index.js';



const initAuthRoutes = ()=>{
  const authRoutes = express.Router();
  authRoutes.post('/send-verification-code', verificationController.sendVerificationCode);
  authRoutes.post('/verify-code', verificationController.verifyCode);
  authRoutes.post('/customer/signup',authController.signup)

  // todo : more routes to come.

  return authRoutes;
}



export default initAuthRoutes;
