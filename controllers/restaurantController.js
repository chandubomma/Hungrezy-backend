import { restaurantService } from "../services/index.js"

const TAG = 'controller.restaurant';

const getRestaurants = async(req,res)=>{
    try{
        const result = await restaurantService.getRestaurants(req.query);
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : result.data,
        })
    }catch(error){
        console.error(`${TAG} ERROR in getRestaurants() => ${error.message}`);
        res.status(error.status).send({
            error : error.message
        })
    }
}


export {
    getRestaurants,
}