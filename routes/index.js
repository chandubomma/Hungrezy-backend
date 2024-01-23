import initAuthRoutes from "./authRoutes";
import initRestaurantRoutes from "./restaurantRoutes";
import express from 'express';

const initRoutes = ()=>{
    const router = express.Router()

    router.use('/auth',initAuthRoutes());
    router.use('/restaurant',initRestaurantRoutes());

    return router;
}

export default initRoutes;