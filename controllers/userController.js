import { userService,imageUploadService } from "../services/index.js"

const TAG = 'controller.user';


const uploadImage = async(req,res,next)=>{
    console.log("yes")
    try{
        const result = await imageUploadService.uploadImage(req);
        const data = {
            imageUrl : result.data.secure_url,
            imageId : result.data.public_id,
            userId : req.params.id
        }
        const restaurant = await userService.addImageDetails(data);
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
    uploadImage,
}