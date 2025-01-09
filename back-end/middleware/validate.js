const Joi = require("joi");
const BadRequestError = require('../errors/BadRequestError')
const mongoLogger = require("../helpers/mongoLogger");

module.exports = schema => {
  return (req, res, next) => {
    const isNotValid = schema.validate(req.body);

    //console.log(isNotValid.error)

    if (isNotValid.error) {
          const error = new BadRequestError(isNotValid.error.message) 
          console.log("Error handler: " + error.message)
      
          mongoLogger.storeError(error);
        
          res.status(400).json({error: error.message});
          return
    }

    next();
  };
};
