import { Restaurant } from "../models/index.js";
import { dbUtils } from "../utils/index.js";
import { getAllFoodItems } from "./mongoService.js";

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

const getLocations = async()=>{
    try {
        const citiesWithAreas = await Restaurant.aggregate([
            { $group: { _id: '$city', areas: { $addToSet: '$area' } } }
        ]);
        const citiesAndAreas = {};
        citiesWithAreas.forEach(({ _id, areas }) => {
            citiesAndAreas[_id] = areas;
        });
        return {
            status : 200,
            message : 'Locations HIT!',
            data : citiesAndAreas
        };
    } catch (error) {
        console.error(`${TAG} ERROR in getLocations() => ${error}`);
        throw error;
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

const getMenu = async(id)=>{
    if(!id)throw{
        message : "Id is not provided",
        status : 400,
    }
    try{
        const ObjectId = dbUtils.stringToObjectId(id);
        const menu = await getAllFoodItems(ObjectId);
        return {
            status : 200,
            message : 'menu HIT!',
            data : menu
        }
    }catch(error){
        console.error(`${TAG} ERROR in getMenu() => ${error}`);
    }
}

const updateRestaurant = async(req)=>{
    const {city,area,address}=req.body;
    const id = req.params.id;
    try{
        const ObjectId = dbUtils.stringToObjectId(id);
        const restaurant = await Restaurant.findById(ObjectId)
        if(!restaurant)throw{
            message : 'Restaurant not found!',
            status : 404,
        }
        restaurant.city=city;
        restaurant.area=area;
        restaurant.address=address;
        await restaurant.save();
        return {
            status : 200,
            message : 'Restaurant details updated',
            data : restaurant,
        }
    }catch(error){
        console.error(`${TAG} ERROR in updateRestaurant() => ${error}`);
    }
}

const addImageDetails = async(data)=>{
    const {imageUrl,imageId,restaurantId} = data
    if(!imageUrl && !imageId && restaurantId)throw{
        message : 'Image details not provided',
        status : 400
    }
    try{
        const ObjectId = dbUtils.stringToObjectId(restaurantId)
        const restaurant = await Restaurant.findById(ObjectId)
        if(!restaurant)throw{
            message : 'Restaurant not found!',
            status : 404,
        }
        restaurant.image = imageUrl;
        restaurant.imageId = imageId;
        await restaurant.save();
        return {
            status: 200,
            message: 'Image details added successfully',
            data: restaurant
        };
    }catch(error){
        console.error(`${TAG} ERROR in addImageDetails() => ${error}`);
    }
}


export {
    getRestaurants,
    getRestaurantById,
    getRestaurantId,
    getMenu,
    addImageDetails,
    getLocations,
    updateRestaurant,
}