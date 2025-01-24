const Joi = require("joi");

const TournamentScheme = {
    create: Joi.object().keys({
        title: Joi.string()
        .min(1)
        .max(255)
        .required(),

        start_date: Joi.date()
        .required(),

        end_date: Joi.date(),        

        organizer_id: Joi.number()
        .integer()
        .min(1),

        is_began: Joi.boolean(),

    }),
    
    update: Joi.object().keys({
        title: Joi.string()
        .min(1)
        .max(255),

        start_date: Joi.date(),

        end_date: Joi.date(),        

        organizer_id: Joi.number()
        .integer()
        .min(1),

        is_began: Joi.boolean(),

    })
}

module.exports = TournamentScheme;
