import { User } from "../models/index.js";
import { dbUtils } from "../utils/index.js";

const TAG = 'service.user';


const addImageDetails = async(data)=>{
    const {imageUrl,imageId,userId} = data
    if(!imageUrl && !imageId && userId)throw{
        message : 'Image details not provided',
        status : 400
    }
    try{
        const ObjectId = dbUtils.stringToObjectId(userId)
        const user = await User.findById(ObjectId)
        if(!user)throw{
            message : 'User not found!',
            status : 404,
        }
        user.image = imageUrl;
        user.imageId = imageId;
        await user.save();
        return {
            status: 200,
            message: 'Image details added successfully',
            data: user
        };
    }catch(error){
        console.error(`${TAG} ERROR in addImageDetails() => ${error}`);
    }
}

export {
    addImageDetails,
}