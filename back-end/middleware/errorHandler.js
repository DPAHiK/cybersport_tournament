

module.exports = (error, req, res, next) => {

    console.log("Error handler: " + error.message)

  
    res.status(error.status || 500).json({error: error.message});
  
  };
  