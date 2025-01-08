const Joi = require("joi");

const TeamQueryScheme = {
    create: Joi.object().keys({
        team_id: Joi.number()
        .integer()
        .min(1)
        .required(),

        sending_date: Joi.date()
        .required(),

        description: Joi.string()
        .min(1)
        .max(255)
        .required(),

        status: Joi.boolean()

    })
}

module.exports = TeamQueryScheme;
