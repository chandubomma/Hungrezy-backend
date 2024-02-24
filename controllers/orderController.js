import { orderService } from "../services/index.js";

const TAG = 'controller.order'


const placeOrder = async(req,res,next)=>{
    try{
        const result = await orderService.placeOrder(req.body)
        res.status(result.status).send(result)
    }catch(error){
        console.error(`${TAG} ERROR in placeOrder() => ${error}`);
        next(error)
    }
}

const getUserOrders = async(req,res,next)=>{
    const user_id = req.params.user_id;
    const status = req.query.status;
    try{
        const result = await orderService.getUserOrders(user_id,status)
        res.status(result.status).send(result)
    }catch(error){
        console.error(`${TAG} ERROR in getUserOrders() => ${error}`);
        next(error)
    }
}

const getRestaurantOrders = async(req,res,next)=>{
    const restaurant_id = req.params.restaurant_id;
    const status = req.query.status;
    const customerId = req.query.customerId;
    try{
        const result = await orderService.getRestaurantOrders(restaurant_id,status,customerId)
        res.status(result.status).send(result)
    }catch(error){
        console.error(`${TAG} ERROR in getRestaurantOrders() => ${error}`);
        next(error)
    }
}

export {
    placeOrder,
    getUserOrders,
    getRestaurantOrders
}