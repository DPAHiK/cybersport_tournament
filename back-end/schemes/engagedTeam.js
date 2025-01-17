const Joi = require("joi");

const EngagedTeamScheme = {
    create: Joi.object().keys({
        tournament_id: Joi.number()
        .integer()
        .min(1)
        .required(),

        team_id: Joi.number()
        .integer()
        .min(1)
        .required(),

        team_grid_status: Joi.number()
        .integer()
        .min(0)
        .max(2)
        .required()
    }),
        update: Joi.object().keys({
            tournament_id: Joi.number()
            .integer()
            .min(1),

            team_id: Joi.number()
            .integer()
            .min(1),

            team_grid_status: Joi.number()
            .integer()
            .min(0)
            .max(2)
        })
}

module.exports = EngagedTeamScheme;
