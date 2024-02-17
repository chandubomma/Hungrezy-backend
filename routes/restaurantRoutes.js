import express from 'express'
import { restaurantController } from '../controllers/index.js';
import { isRestaurant } from '../middleware/permissionsMiddleware.js';
import { multerUploads } from '../middleware/multerMiddleware.js';

const initRestaurantRoutes = ()=>{
  const restaurantRoutes = express.Router();
  restaurantRoutes.route('/').get(restaurantController.getRestaurants)
  restaurantRoutes.route('/id').get(restaurantController.getRestaurantId)
  restaurantRoutes.route('/:id').get(restaurantController.getRestaurantById).put(isRestaurant,restaurantController.updateRestaurant)
  restaurantRoutes.route('/menu/:id').get(restaurantController.getMenu)
  restaurantRoutes.route(':id/upload/image').post(multerUploads,restaurantController.uploadImage)  // todo:need to add isAuthenticated and isRestaurant checks
  return restaurantRoutes;
}



export default initRestaurantRoutes;