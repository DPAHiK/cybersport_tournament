const Joi = require("joi");

const TeamScheme = {
    create: Joi.object().keys({
      name: Joi.string()
        .max(50)
        .required(),

      user_id: Joi.number()
        .integer()
        .min(1)  
    }),

    update: Joi.object().keys({
      name: Joi.string()
        .max(50),

      user_id: Joi.number()
        .integer()
        .min(1)
    })
}

module.exports = TeamScheme;
