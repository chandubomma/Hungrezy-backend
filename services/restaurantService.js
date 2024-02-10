import { Restaurant } from "../models/index.js";
import { dbUtils } from "../utils/index.js";
const TAG = 'service.restaurant';

const getRestaurants = async(query)=>{
    const city = query.city;
    const area = query.area;
    if(!city || !area)throw{
        message : "Invalid query parameters",
        status : 400
    }
    const filter={city,area};
    try{
        const restaurants = await Restaurant.find(filter)
        return {
            status : 200,
            message : 'Get Restaurants Successful!',
            data : restaurants,
        }
    }catch(error){
        console.error(`${TAG} ERROR in getRestaurants() => ${error}`);
    }
    
}


const getRestaurantById = async(id)=>{
    if(!id)throw{
        message : "Id is not provided",
        status : 400,
    }
    try{
        const ObjectId = dbUtils.stringToObjectId(id)
        const restaurant = await Restaurant.findById(ObjectId)
        return {
            status : 200,
            message : 'Restaurant HIT!',
            data : restaurant
        }
    }catch(error){
        console.error(`${TAG} ERROR in getRestaurantById() => ${error}`);
    }
}

const getRestaurantId = async(query)=>{
    const email = query.email;
    if(!email)throw{
        message : "restaurant email is not provided",
        status : 400,
    }
    try{
        const restaurant = await Restaurant.findOne({email})
        return {
            status : 200,
            message : 'Restaurant HIT!',
            data : {
                id : restaurant._id
            }
        }
    }catch(error){
        console.error(`${TAG} ERROR in getRestaurantId() => ${error}`);
    }
}


export {
    getRestaurants,
    getRestaurantById,
    getRestaurantId,
}