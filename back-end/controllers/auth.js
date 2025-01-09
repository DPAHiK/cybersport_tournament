
const authService = require("../services/auth");
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const mongoLogger = require("../helpers/mongoLogger");
const UnauthorizedError = require('../errors/UnauthorizedError')

class LoginController {
  async login(req, res, next) {
    try {
      //check if user exists
      const userExists = await User.findOne({where: {name: req.body.name}});
      //console.log(userExists.name)
      if (!userExists){
        mongoLogger.storeError(new UnauthorizedError("incorrect login or password"));
        return res.status(400).json({ message: "incorrect login or password" });
      }
        
  
      if (!userExists.validatePassword(req.body.password)){
        mongoLogger.storeError(new UnauthorizedError("incorrect login or password"));
        return res.status(400).json({ message: "incorrect login or password" });
      }

      const accessToken = jwt
        .sign(
          {
            id: userExists.id,
            name: userExists.name,
            role: userExists.role
          },
          "secret",
          { expiresIn: "1d" }
        )
  
      return res
        .status(200)
        .json({ message: "User logged in", accessToken: accessToken });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  

  async signup(req, res, next) {
    const userData = req.body;
    try {
      await authService.signUp(userData);
      res.status(200).json({ message:"Registration successful"});
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
}

module.exports = new LoginController();
