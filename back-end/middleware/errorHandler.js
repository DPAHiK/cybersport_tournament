const mongoLogger = require("../helpers/mongoLogger");

module.exports = (error, req, res, next) => {

    //error.route = req._parsedOriginalUrl.path;
    console.log(error.message)
    //console.log(req)
    error.route = req._parsedOriginalUrl.path;
  //console.log("popal")
    mongoLogger.storeError(error);
  
    res.status(error.status || 500).json({error: error.message});
  
  };
  