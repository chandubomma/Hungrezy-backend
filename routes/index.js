import initAuthRoutes from "./authRoutes.js";
import initRestaurantRoutes from "./restaurantRoutes.js";
import express from 'express';

const initRoutes = ()=>{
    const router = express.Router()

    router.use('/auth',initAuthRoutes());
    router.use('/restaurant',initRestaurantRoutes());

    return router;
}

export default initRoutes;