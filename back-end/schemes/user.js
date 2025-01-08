const Joi = require("joi");

const UserScheme = {
    create: Joi.object().keys({
      name: Joi.string()
        .max(50)
        .required(),
      password: Joi.string()
        .min(4)
        .max(20)
        .required(),
      role: Joi.string()
      .max(50)
    }),

    update: Joi.object().keys({
      name: Joi.string()
        .max(50),
      password: Joi.string()
        .min(4)
        .max(20),
      role: Joi.string()
        .max(50)
    }),

    login: Joi.object().keys({
      name: Joi.string()
        .min(1)
        .required(),
      password: Joi.string()
        .min(4)
        .max(20)
        .required()
    })
}

module.exports = UserScheme;
