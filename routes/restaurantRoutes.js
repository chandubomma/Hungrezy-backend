import express from 'express'
import { restaurantController } from '../controllers/index.js';

const initRestaurantRoutes = ()=>{
  const restaurantRoutes = express.Router();
  restaurantRoutes.route('/').get(restaurantController.getRestaurants)
 
  // todo : more routes to come.
  return restaurantRoutes;
}



export default initRestaurantRoutes;