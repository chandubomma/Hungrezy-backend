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


export {
    placeOrder,
    getUserOrders,
}