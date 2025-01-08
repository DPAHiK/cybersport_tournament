const Joi = require("joi");

const TeamScheme = {
    create: Joi.object().keys({
      name: Joi.string()
        .max(50)
        .required()
    }),

    update: Joi.object().keys({
      name: Joi.string()
        .max(50)
    })
}

module.exports = TeamScheme;
