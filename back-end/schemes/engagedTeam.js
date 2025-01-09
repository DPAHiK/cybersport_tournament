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

        team_grid_status: Joi.string()
        .max(20)
    }),
        update: Joi.object().keys({
            tournament_id: Joi.number()
            .integer()
            .min(1),

            team_id: Joi.number()
            .integer()
            .min(1),

            team_grid_status: Joi.string()
            .max(20)
        })
}

module.exports = EngagedTeamScheme;
