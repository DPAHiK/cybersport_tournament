const Joi = require("joi");

const MemberQueryScheme = {
    create: Joi.object().keys({
        team_id: Joi.number()
        .integer()
        .min(1)
        .required(),

        user_id: Joi.number()
        .integer()
        .min(1),

        sending_date: Joi.date()
        .required(),
    }),

    update: Joi.object().keys({
            team_id: Joi.number()
            .integer()
            .min(1),

            user_id: Joi.number()
            .integer()
            .min(1),

            sending_date: Joi.date(),
        })
}

module.exports = MemberQueryScheme;
