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

        query_id: Joi.number()
        .integer()
        .min(1)
        .required(),

        organizer_id: Joi.number()
        .integer()
        .min(1)
        .required()

    }),
    
    update: Joi.object().keys({
        title: Joi.string()
        .min(1)
        .max(255),

        start_date: Joi.date(),

        end_date: Joi.date(),        

        query_id: Joi.number()
        .integer()
        .min(1),

        organizer_id: Joi.number()
        .integer()
        .min(1)

    })
}

module.exports = TournamentScheme;
