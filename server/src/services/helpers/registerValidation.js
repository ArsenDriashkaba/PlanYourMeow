import Joi from "@hapi/joi";

const validateRegister = (req) => {
  const registerSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    secondName: Joi.string().min(3).required(),
    email: Joi.string().min(8).email().required(),
    password: Joi.string().min(8).required(),
  });

  return registerSchema.validate(req.body);
};

export default validateRegister;
