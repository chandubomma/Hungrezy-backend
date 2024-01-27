import Joi from 'joi';

const emailValidation = Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required();
const passwordValidation = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required()

const validate = async (schema, req, res, next) => {
    let body = Object.assign({}, req.params, req.query);
    if (req.method === 'POST' || req.method === 'PUT') {
        body = Object.assign(body, req.body);
    }
    const result = await schema.validate(body, {abortEarly: false});
    if (result.error) {
        console.error(result.error);
        res.status(422).send({
            error: result.error,
            message: result.error.message,
            showMessage: false,
        });
    } else {
        next();
    }
};


export {
    validate,
    emailValidation,
    passwordValidation
}