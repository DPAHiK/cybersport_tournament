const Joi = require("joi");

const TeamMemberScheme = {
    create: Joi.object().keys({
        team_id: Joi.number()
        .integer()
        .min(1)
        .required(),

        user_id: Joi.number()
        .integer()
        .min(1)
        .required()
    }),

    update:{
        create: Joi.object().keys({
            team_id: Joi.number()
            .integer()
            .min(1),

            user_id: Joi.number()
            .integer()
            .min(1)
        })
    }
}

module.exports = TeamMemberScheme;
