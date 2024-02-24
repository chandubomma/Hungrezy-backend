import express from 'express'
import { orderController } from '../controllers/index.js'
import * as validations from '../middleware/validations/orderValidations.js'
import { isAuthenticated } from '../middleware/authenticationMiddleware.js'
import { isUser } from '../middleware/permissionsMiddleware.js'

const initOrderRoutes = ()=>{
    const orderRoutes = express.Router()

    orderRoutes.route('/place').post(isAuthenticated,isUser,validations.placeOrder,orderController.placeOrder)

    return orderRoutes
}


export default initOrderRoutes