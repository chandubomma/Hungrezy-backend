import express from 'express'
import { isAuthenticated } from '../middleware/authenticationMiddleware.js';
import { multerUploads } from '../middleware/multerMiddleware.js';
import {userController} from '../controllers/index.js';
import { isUser } from '../middleware/permissionsMiddleware.js';


const initUserRoutes = ()=>{
    const userRoutes = express.Router();
    userRoutes.route('/:id/upload/image').post(isAuthenticated,isUser,multerUploads,userController.uploadImage)
    return userRoutes;
  }
  
  
  
  export default initUserRoutes;