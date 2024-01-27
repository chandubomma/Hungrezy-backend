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

export{
    signin,
    signup,
}