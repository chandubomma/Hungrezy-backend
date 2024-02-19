import {authService} from '../services/index.js'
import { authUtils } from "../utils/index.js";

const TAG = 'controller.auth';

const signin = async(req,res)=>{
    try {
        const result = await authService.signin(req.body);
        if(result.token){
            const refreshToken = result.token.refreshToken;
            delete result.token.refreshToken;
            res.cookie('refreshToken', refreshToken, { httpOnly: true })
        }
        res.status(result.status).send({
            status: result.status,
            message: result.message,
            showMessage: false,
            data: result.token,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in signin() => ${error}`);
    }
}

const signinSendOtp = async(req,res)=>{
    try {
        const result = await authService.signinSendOtp(req.body);
        res.status(result.status).send({
            status: result.status,
            message: result.message,
            showMessage: false,
            data: result.token,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in signinSendOtp() => ${error}`);
    }
}

const signinVerifyOtp = async(req,res)=>{
    try {
        const result = await authService.signinVerifyOtp(req.body);
        if(result.token){
            const refreshToken = result.token.refreshToken;
            delete result.token.refreshToken;
            res.cookie('refreshToken', refreshToken, { httpOnly: true })
        }
        res.status(result.status).send({
            status: result.status,
            message: result.message,
            showMessage: false,
            data: result.token,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in signinVerifyOtp() => ${error}`);
    }
}



const signup = async(req,res)=>{
    try {
        const result = await authService.signup(req.body);
        if(result.token){
            const refreshToken = result.token.refreshToken;
            delete result.token.refreshToken;
            res.cookie('refreshToken', refreshToken, { httpOnly: true })
        }
        res.status(result.status).send({
            status: result.status,
            message: result.message,
            showMessage: false,
            data: result.token,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in signup() => ${error}`);
    }
}

const restaurantSignin = async(req,res)=>{
    try {
        const result = await authService.restaurantSignin(req.body);
        if(result.token){
            const refreshToken = result.token.refreshToken;
            delete result.token.refreshToken;
            res.cookie('refreshToken', refreshToken, { httpOnly: true })
        }
        res.status(result.status).send({
            status: result.status,
            message: result.message,
            showMessage: false,
            data: result.token,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in restaurantSignin() => ${error}`);
    }
}

const restaurantSignup = async(req,res)=>{
    try {
        const result = await authService.restaurantSignup(req.body);
        if(result.token){
            const refreshToken = result.token.refreshToken;
            delete result.token.refreshToken;
            res.cookie('refreshToken', refreshToken, { httpOnly: true })
        }
        res.status(result.status).send({
            status: result.status,
            message: result.message,
            showMessage: false,
            data: result.token,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in restaurantSignup() => ${error}`);
    }
}

const adminSignin = async(req,res)=>{
    try {
        const result = await authService.adminSignin(req.body);
        if(result.token){
            const refreshToken = result.token.refreshToken;
            delete result.token.refreshToken;
            res.cookie('refreshToken', refreshToken, { httpOnly: true })
        }
        res.status(result.status).send({
            status: result.status,
            message: result.message,
            showMessage: false,
            data: result.token,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in adminSignin() => ${error}`);
    }
}

const adminSignup = async(req,res)=>{
    try {
        const result = await authService.adminSignup(req.body);
        if(result.token){
            const refreshToken = result.token.refreshToken;
            delete result.token.refreshToken;
            res.cookie('refreshToken', refreshToken, { httpOnly: true })
        }
        res.status(result.status).send({
            status: result.status,
            message: result.message,
            showMessage: false,
            data: result.token,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in adminSignup() => ${error}`);
    }
}

const refresh_Token = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not found' });
        }
        const decode  = await authUtils.verifyRefreshJWT(refreshToken);
        const accessToken = await authUtils.generateAccessToken({id:decode.email,user_role:req.body.user_role});
        res.status(200).send({accessToken});
    } catch (error) {
        console.error(`${TAG} refresh_Token() => ${error}`);
    }
}

export{
    signin,
    signup,
    restaurantSignup,
    restaurantSignin,
    adminSignin,
    adminSignup,
    signinSendOtp,
    signinVerifyOtp,
    refresh_Token,
}