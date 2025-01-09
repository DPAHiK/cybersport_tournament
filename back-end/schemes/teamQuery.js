const Joi = require("joi");

const TeamQueryScheme = {
    create: Joi.object().keys({
        team_id: Joi.number()
        .integer()
        .min(1)
        .required(),

        tournament_id: Joi.number()
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

    }),

    update: Joi.object().keys({
        team_id: Joi.number()
        .integer()
        .min(1),

        tournament_id: Joi.number()
        .integer()
        .min(1),

        sending_date: Joi.date(),

        description: Joi.string()
        .min(1)
        .max(255),

        status: Joi.boolean()

    })

}

module.exports = TeamQueryScheme;
