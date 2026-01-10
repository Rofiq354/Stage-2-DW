import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, maxDomainSegments: 5 })
    .required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .required()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/
    ),
  confirm_password: Joi.ref("password"),
  isSupplier: Joi.boolean(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
