import { Restaurant } from "../models/index.js";
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




export {
    getRestaurants,
}