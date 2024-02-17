import { passwordUtils,authUtils } from "../utils/index.js";
import {User,Restaurant,Admin} from '../models/index.js';
import * as Constants from '../constants/userRoleConstants.js'

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
        const accessToken = await authUtils.generateAccessToken({id:user.email,user_role:Constants.USER_ROLE});
        const refreshToken = await authUtils.generateRefreshToken({user});
        const token = {}
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.user = user;
        return {
            status : 200 ,
            message : 'Sign in Successfull!',
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
            const accessToken = await authUtils.generateAccessToken({id:user.email,user_role:Constants.USER_ROLE});
            const refreshToken = await authUtils.generateRefreshToken({user});
            const token = {}
            token.accessToken = accessToken;
            token.refreshToken = refreshToken;
            token.user = user;
            return {
                status : 200,
                message : 'Sign up successfull!',
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

const restaurantSignin = async(payload)=>{
    const {email,password} = payload;
    try{
        const restaurant = await Restaurant.findOne({email});
        if(!restaurant){
            return {
                status : 400,
                message : 'Restaurant not found! Please Signup first'
            }
        }
        if(!await passwordUtils.comparePasswords(restaurant.password,password)){
            return{
                message: 'Incorrect Password! Please try again.',
                status: 400,
            }
        }
        const accessToken = await authUtils.generateAccessToken({id:restaurant.email,user_role:Constants.USER_ROLE_RESTAURANT});
        const refreshToken = await authUtils.generateRefreshToken({restaurant});
        const token = {}
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.user = restaurant;
        return {
            status : 200 ,
            message : 'Sign in Successfull!',
            token : token
        };
    }catch(error){
        console.error(error)
    }
}


const restaurantSignup = async(payload)=>{
    const {
        email,
        password,
        name
    } = payload
    try{
        const decode = await authUtils.verifyJWT(accessToken);
        if(decode){
            const hashPassword = await passwordUtils.hashPassword(password)
            const temp = {
                email,
                name,
                password : hashPassword
            }
            let restaurant = new Restaurant(temp)
            await restaurant.save()
            const accessToken = await authUtils.generateAccessToken({id:restaurant.email,user_role:Constants.USER_ROLE_RESTAURANT});
            const refreshToken = await authUtils.generateRefreshToken({restaurant});
            const token = {}
            token.accessToken = accessToken;
            token.refreshToken = refreshToken;
            token.user = restaurant;
            return {
                status : 200,
                message : 'Sign up successfull!',
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


const adminSignin = async(payload)=>{
    const {email,password} = payload;
    try{
        const admin = await Admin.findOne({email});
        if(!admin){
            return {
                status : 400,
                message : 'Admin not found! Please Signup first'
            }
        }
        if(!await passwordUtils.comparePasswords(admin.password,password)){
            return{
                message: 'Incorrect Password! Please try again.',
                status: 400,
            }
        }
        const accessToken = await authUtils.generateAccessToken({id:admin.email,user_role:Constants.USER_ROLE_ADMIN});
        const refreshToken = await authUtils.generateRefreshToken({admin});
        const token = {}
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.user = admin;
        return {
            status : 200 ,
            message : 'Sign in Successfull!',
            token : token
        };
    }catch(error){
        console.error(error)
    }
}

const adminSignup = async(payload)=>{
    const {
        email,
        password,
        lastName,
        firstName,
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
                password : hashPassword
            }
            let admin = new Admin(temp)
            await admin.save()
            const accessToken = await authUtils.generateAccessToken({id:admin.email,user_role:Constants.USER_ROLE_ADMIN});
            const refreshToken = await authUtils.generateRefreshToken({admin});
            const token = {}
            token.accessToken = accessToken;
            token.refreshToken = refreshToken;
            token.user = admin;
            return {
                status : 200,
                message : 'Sign up successfull!',
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
    restaurantSignup,
    restaurantSignin,
    adminSignin,
    adminSignup
}