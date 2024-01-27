import Joi from 'joi';
import {validate,emailValidation,passwordValidation} from './common.js';

const signin  = async(req,res,next)=>{
    const schema = Joi.object({
        email : emailValidation,
        password: passwordValidation,
    })
    await validate(schema,req,res,next);
}


export {
    signin,
}