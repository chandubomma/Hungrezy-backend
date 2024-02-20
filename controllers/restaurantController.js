import { restaurantService,imageUploadService } from "../services/index.js"

const TAG = 'controller.restaurant';

const getRestaurants = async(req,res,next)=>{
    try{
        const result = await restaurantService.getRestaurants(req.query);
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : result.data,
        })
    }catch(error){
        console.error(`${TAG} ERROR in getRestaurants() => ${error.message}`);
        next(error)
    }
}

const getLocations = async(req,res,next)=>{
    try{
        const result = await restaurantService.getLocations();
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : result.data,
        })
    }catch(error){
        console.error(`${TAG} ERROR in getLocations() => ${error.message}`);
        next(error)
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
        next(error)
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
        next(error)
    }
}

const updateRestaurant = async(req,res)=>{
    try{
        const result = await restaurantService.updateRestaurant(req);
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : result.data,
        })
    }catch(error){
        console.error(`${TAG} ERROR in updateRestaurant() => ${error.message}`);
        next(error)
    }
}


const getMenu = async(req,res)=>{
    try{
        const result = await restaurantService.getMenu(req.params.menu_id);
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : result.data,
        })
    }catch(error){
        console.error(`${TAG} ERROR in getMenu() => ${error.message}`);
        next(error)
    }
}

const uploadImage = async(req,res)=>{
    try{
        const result = await imageUploadService.uploadImage(req);
        const data = {
            imageUrl : result.data.secure_url,
            imageId : result.data.public_id,
            restaurantId : req.params.id
        }
        const restaurant = await restaurantService.addImageDetails(data);
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : restaurant,
        })
    }catch(error){
        console.error(`${TAG} ERROR in uploadImage() => ${error.message}`);
        next(error)
    }
}


export {
    getRestaurants,
    getRestaurantById,
    getRestaurantId,
    updateRestaurant,
    getMenu,
    uploadImage,
    getLocations,
}