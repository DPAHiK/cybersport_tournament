const Joi = require("joi");

const TournamentResultScheme = {
    create: Joi.object().keys({ 
    
        tournament_id: Joi.number()
        .integer()
        .min(1)
        .required(),

        team_id: Joi.number()
        .integer()
        .min(1)
        .required(),

        place: Joi.number()
        .integer()
        .min(1)
        .max(255)
        .required()

    }),
    
    update: Joi.object().keys({
        tournament_id: Joi.number()
        .integer()
        .min(1),

        team_id: Joi.number()
        .integer()
        .min(1),

        place: Joi.number()
        .integer()
        .min(1)
        .max(255)

    })
}

module.exports = TournamentResultScheme;
