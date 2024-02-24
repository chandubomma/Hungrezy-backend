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


export {
    placeOrder
}