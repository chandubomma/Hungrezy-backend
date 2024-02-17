import express from 'express'
import { restaurantController } from '../controllers/index.js';
import { isRestaurant } from '../middleware/permissionsMiddleware.js';

const initRestaurantRoutes = ()=>{
  const restaurantRoutes = express.Router();
  restaurantRoutes.route('/').get(restaurantController.getRestaurants)
  restaurantRoutes.route('/id').get(restaurantController.getRestaurantId)
  restaurantRoutes.route('/:id').get(restaurantController.getRestaurantById).put(isRestaurant,restaurantController.updateRestaurant)
  restaurantRoutes.route('/menu/:id').get(restaurantController.getMenu)

  return restaurantRoutes;
}



export default initRestaurantRoutes;