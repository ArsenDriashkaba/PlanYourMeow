import Joi from "@hapi/joi";

const validateLogin = (req) => {
  const loginSchema = Joi.object({
    email: Joi.string().min(8).email().required(),
    password: Joi.string().min(8).required(),
  });

  return loginSchema.validate(req.body);
};

export default validateLogin;
