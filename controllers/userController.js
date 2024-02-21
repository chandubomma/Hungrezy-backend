import { userService,imageUploadService } from "../services/index.js"

const TAG = 'controller.user';


const uploadImage = async(req,res,next)=>{
    
    try{
        const result = await imageUploadService.uploadImage(req);
        const data = {
            imageUrl : result.data.secure_url,
            imageId : result.data.public_id,
            userId : req.params.id
        }
        const token = await userService.addImageDetails(data);
        res.status(result.status).send({
            status : result.status,
            message : result.message,
            data : token,
        })
    }catch(error){
        console.error(`${TAG} ERROR in uploadImage() => ${error.message}`);
        next(error)
    }
}


export {
    uploadImage,
}