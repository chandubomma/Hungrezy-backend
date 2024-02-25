import Joi from 'joi';
import {validate} from './common.js';

const placeOrder = async(req,res,next)=>{
    console.log(req.body)
    const schema = Joi.object({
        userId: Joi.string().required(),
        restaurantId: Joi.string().required(),
        foodItems: Joi.array().items(
          Joi.object({
            name: Joi.string().required(),
            quantity: Joi.number().integer().min(1).required(),
            category: Joi.string().required(),
            price: Joi.number().integer().required(),
            veg_or_non_veg : Joi.string().required(),
          })
        ).required(),
        address: Joi.string().required(),
        paymentDetails: Joi.object({
          method: Joi.string().required(),
          amount: Joi.number().required()
        }).required(),
    })
    await validate(schema,req,res,next);
}


export{
    placeOrder,
}