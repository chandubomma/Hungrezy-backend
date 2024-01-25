import { passwordUtils,authUtils } from "../utils/index.js";
import {User} from '../models/index.js';

const signin = async(payload)=>{
    
}


const signup = async(payload)=>{
    const {
        email,
        password,
        lastName,
        firstName,
        mobileNumber,
        accessToken,
    } = payload
    try{
        const decode = await authUtils.verifyJWT(accessToken);
        if(decode){
            const hashPassword = await passwordUtils.hashPassword(password)
            const temp = {
                email,
                firstName,
                lastName,
                mobileNumber,
                password : hashPassword
            }
            let user = new User(temp)
            await user.save()
            const accessToken = await authUtils.generateAccessToken({user});
            const refreshToken = await authUtils.generateRefreshToken({user});
            const token = {}
            token.accessToken = accessToken;
            token.refreshToken = refreshToken;
            token.user = user;
            return token;
        }else{
            throw {
                message: 'Signup failed! Please try again.',
                status: 400,
            };
        }
    }catch(error){
        console.error(error);
    }
}



export {
    signin,
    signup,
}