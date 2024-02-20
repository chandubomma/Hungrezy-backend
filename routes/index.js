import initAuthRoutes from "./authRoutes.js";
import initRestaurantRoutes from "./restaurantRoutes.js";
import initUserRoutes from "./userRoutes.js";
import express from 'express';

const initRoutes = ()=>{
    const router = express.Router()

    router.use('/auth',initAuthRoutes());
    router.use('/restaurant',initRestaurantRoutes());
    router.use('/user',initUserRoutes())

    return router;
}

export default initRoutes;