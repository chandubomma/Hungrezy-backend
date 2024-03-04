import Joi from "joi";
import { validate } from "./common.js";

const sendReviewMessage = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    message: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
  });
  await validate(schema, req, res, next);
};

export { sendReviewMessage };
