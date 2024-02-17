import { restaurantService,imageUploadService } from "../services/index.js"

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

const updateRestaurant = async(req,res)=>{

}


const getMenu = async(req,res)=>{
    try{
        const result = await restaurantService.getMenu(req.params.id);
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : result.data,
        })
    }catch(error){
        console.error(`${TAG} ERROR in getMenu() => ${error.message}`);
        res.status(error.status).send({
            error : error.message
        })
    }
}

const uploadImage = async(req,res)=>{
    try{
        console.log('hello')
        const result = await imageUploadService.uploadImage(req);
        const data = {
            imageUrl : result.secure_url,
            imageId : result.public_id,
            restaurantId : req.params.id
        }
        const restaurant = await restaurantService.addImageDetails();
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : restaurant,
        })
    }catch(error){
        console.error(`${TAG} ERROR in uploadImage() => ${error.message}`);
        res.status(error.status).send({
            error : error.message
        })
    }
}


export {
    getRestaurants,
    getRestaurantById,
    getRestaurantId,
    updateRestaurant,
    getMenu,
    uploadImage,
}