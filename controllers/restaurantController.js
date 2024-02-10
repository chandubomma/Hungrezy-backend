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


const getRestaurantById = async(req,res)=>{
    try{
        const result = await restaurantService.getRestaurantById(req.params.id);
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : result.data,
        })
    }catch(error){
        console.error(`${TAG} ERROR in getRestaurantById() => ${error.message}`);
        res.status(error.status).send({
            error : error.message
        })
    }
}

const getRestaurantId = async(req,res)=>{
    try{
        const result = await restaurantService.getRestaurantId(req.query);
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : result.data,
        })
    }catch(error){
        console.error(`${TAG} ERROR in getRestaurantId() => ${error.message}`);
        res.status(error.status).send({
            error : error.message
        })
    }
}


export {
    getRestaurants,
    getRestaurantById,
    getRestaurantId,
}