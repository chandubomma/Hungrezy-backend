import initAuthRoutes from "./authRoutes.js";
import initRestaurantRoutes from "./restaurantRoutes.js";
import initUserRoutes from "./userRoutes.js";
import initAdminRoutes from "./adminRoutes.js";
import express from 'express';

const initRoutes = ()=>{
    const router = express.Router()

    router.use('/auth',initAuthRoutes());
    router.use('/restaurant',initRestaurantRoutes());
    router.use('/user',initUserRoutes())
    router.use('/admin',initAdminRoutes())
    return router;
}

export default initRoutes;