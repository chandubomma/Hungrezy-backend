import express from 'express'
import { restaurantController } from '../controllers/index.js';

const initRestaurantRoutes = ()=>{
  const restaurantRoutes = express.Router();
  restaurantRoutes.route('/').get(restaurantController.getRestaurants)
  restaurantRoutes.route('/id').get(restaurantController.getRestaurantId)
  restaurantRoutes.route('/:id').get(restaurantController.getRestaurantById)
  // todo : more routes to come.
  return restaurantRoutes;
}



export default initRestaurantRoutes;