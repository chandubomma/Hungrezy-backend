import { passwordUtils,authUtils } from "../utils/index.js";
import {User} from '../models/index.js';

const signin = async(payload)=>{
    const {email,password} = payload;
    try{
        const user = await User.findOne({email});
        if(!user){
            return {
                status : 400,
                message : 'User not found! Please Signup first'
            }
        }
        if(!await passwordUtils.comparePasswords(user.password,password)){
            return{
                message: 'Incorrect Password! Please try again.',
                status: 400,
            }
        }
        const accessToken = await authUtils.generateAccessToken({user});
        const refreshToken = await authUtils.generateRefreshToken({user});
        const token = {}
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.user = user;
        return {
            status : 200 ,
            message : 'Sign in Successfully!',
            token : token
        };
    }catch(error){
        console.error(error)
    }
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
            return {
                status : 200,
                message : 'Sign up successfully!',
                token : token
            };
        }else{
            return {
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