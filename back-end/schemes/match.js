const Joi = require("joi");

const MacthScheme = {
    create: Joi.object().keys({
        tournament_id: Joi.number()
        .integer()
        .min(1)
        .required(),

        start_date: Joi.date()
        .required(),

        end_date: Joi.date(),

        team1_id: Joi.number()
        .integer()
        .min(0)
        .required(),

        team2_id: Joi.number()
        .integer()
        .min(0)
        .required()

    }),

    update: Joi.object().keys({
        tournament_id: Joi.number()
        .integer()
        .min(1),

        is_team1_winner: Joi.boolean(),

        start_date: Joi.date(),

        end_date: Joi.date(),

        team1_id: Joi.number()
        .integer()
        .min(0),

        team2_id: Joi.number()
        .integer()
        .min(0)
    })
}

module.exports = MacthScheme;
