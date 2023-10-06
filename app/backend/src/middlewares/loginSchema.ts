import Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().min(1),
  password: Joi.string().min(1).required(),
});

export default loginSchema;
