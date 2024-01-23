import express from 'express'
import { verificationController } from '../controllers';



const initAuthRoutes = ()=>{
  const authRoutes = express.Router();
  authRoutes.post('/send-verification-code', verificationController.sendVerificationCode);
  authRoutes.post('/verify-code', verificationController.verifyCode);

  // todo : more routes to come.

  return authRoutes;
}



export default initAuthRoutes;
