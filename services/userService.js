import { User } from "../models/index.js";
import { dbUtils } from "../utils/index.js";
import { authUtils } from "../utils/index.js";
import * as Constants from '../constants/userRoleConstants.js'

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
        const accessToken = await authUtils.generateAccessToken({id:user.email,user_role:Constants.USER_ROLE,user});
        const token = {}
        token.accessToken = accessToken;
        token.user = user;
        return {
            token
        };
    }catch(error){
        console.error(`${TAG} ERROR in addImageDetails() => ${error}`);
    }
}

export {
    addImageDetails,
}