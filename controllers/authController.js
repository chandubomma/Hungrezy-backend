import {authService} from '../services/index.js'

const TAG = 'controller.auth';

export const signin = async(req,res)=>{
    try {
        const tokens = await authService.signin(req.body);
        res.send({
            status: 200,
            message: 'Sign in successfully',
            showMessage: false,
            data: tokens,
        });
    } catch (error) {
        console.error(`${TAG} ERROR in loginUser() => ${error}`);
    }
}