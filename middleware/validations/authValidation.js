import Joi from 'joi';
import {
        validate,
        emailValidation,
        passwordValidation,
        mobileNumberValidation
    } from './common.js';

const signin  = async(req,res,next)=>{
    const schema = Joi.object({
        email : emailValidation.required(),
        password : passwordValidation.required(),
    })
    await validate(schema,req,res,next);
}

const signup  = async(req,res,next)=>{
    const schema = Joi.object({
        email : emailValidation.required(),
        password : passwordValidation.required(),
        mobileNumber : mobileNumberValidation.required(),
        firstName : Joi.string().required(),
        lastName : Joi.string().allow(''),
        accessToken : Joi.string().required(),
    })
    await validate(schema,req,res,next);
}


export {
    signin,
    signup
}