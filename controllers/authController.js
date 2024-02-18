import {authService} from '../services/index.js'

const TAG = 'controller.auth';

const signin = async(req,res)=>{
    try {
        const result = await authService.signin(req.body);
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

export{
    signin,
    signup,
    restaurantSignup,
    restaurantSignin,
    adminSignin,
    adminSignup,
    signinSendOtp,
    signinVerifyOtp,
}