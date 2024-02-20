import Joi from 'joi';
import {
        validate,
        emailValidation,
        passwordValidation,
        mobileNumberValidation
    } from './common.js';


    const restaurantUpdateDetails  = async(req,res,next)=>{
        const schema = Joi.object({
            address : Joi.string().required(),
            city : Joi.string().required(),
            area : Joi.string().required(),
            id : Joi.string().required(),
        })
        await validate(schema,req,res,next);
    }


    export{
        restaurantUpdateDetails,
    }