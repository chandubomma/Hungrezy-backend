import {authService} from '../services/index.js'

const TAG = 'controller.auth';

const signin = async(req,res)=>{
    try {
        const tokens = await authService.signin(req.body);
        res.send({
            status: 200,
            message: 'Sign in successfully',
            showMessage: false,
            data: tokens,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in signin() => ${error}`);
    }
}

const signup = async(req,res)=>{
    try {
        const tokens = await authService.signup(req.body);
        res.send({
            status: 200,
            message: 'Sign up successfully',
            showMessage: false,
            data: tokens,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in signup() => ${error}`);
    }
}

export{
    signin,
    signup,
}