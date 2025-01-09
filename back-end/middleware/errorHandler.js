const mongoLogger = require("../helpers/mongoLogger");

module.exports = (error, req, res, next) => {

    console.log("Error handler: " + error.message)

    mongoLogger.storeError(error);
  
    res.status(error.status || 500).json({error: error.message});
  
  };
  