import express from 'express'
import { isAuthenticated } from '../middleware/authenticationMiddleware.js';
import { multerUploads } from '../middleware/multerMiddleware.js';
import {adminController} from '../controllers/index.js';
import { isUser } from '../middleware/permissionsMiddleware.js';


const initAdminRoutes = ()=>{
    const adminRoutes = express.Router();
    //adminRoutes.route('/:id/upload/image').post(isAuthenticated,isUser,multerUploads,userController.uploadImage)
    adminRoutes.route('/all').get(adminController.getAdmins)
    return adminRoutes;
  }
  
  
  
  export default initAdminRoutes;