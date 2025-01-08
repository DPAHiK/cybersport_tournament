const Joi = require("joi");


module.exports = schema => {
  return (req, res, next) => {
    const isNotValid = schema.validate(req.body);

    //console.log(isNotValid.error)

    if (isNotValid.error) {
      isNotValid.error.status = 400
      next(isNotValid.error);
    }

    next();
  };
};
