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

export{
    signin,
    signup,
    restaurantSignup,
    restaurantSignin,
}