const Joi = require("joi");

const TeamQueryScheme = {
    create: Joi.object().keys({
        id: Joi.number()
        .integer()
        .min(1),

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

    }),

    update: Joi.object().keys({
        id: Joi.number()
        .integer()
        .min(1),

        team_id: Joi.number()
        .integer()
        .min(1),

        tournament_id: Joi.number()
        .integer()
        .min(1),

        sending_date: Joi.date(),

        status: Joi.boolean()

    })

}

module.exports = TeamQueryScheme;
