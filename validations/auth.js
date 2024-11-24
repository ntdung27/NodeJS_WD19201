import Joi from 'joi';

const authValidator = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
})

export { authValidator }
