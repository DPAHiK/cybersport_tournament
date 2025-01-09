const Joi = require("joi");
const BadRequestError = require('../errors/BadRequestError')
const mongoLogger = require("../helpers/mongoLogger");

module.exports = schema => {
  return (req, res, next) => {
    const isNotValid = schema.validate(req.body);

    //console.log(isNotValid.error)

    if (isNotValid.error) {
          return next(new BadRequestError(isNotValid.error.message))
    }

    return next();
  };
};
