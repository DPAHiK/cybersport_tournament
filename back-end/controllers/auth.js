
const authService = require("../services/auth");
const userService = require('../services/user')
const jwt = require('jsonwebtoken')
const mongoLogger = require("../helpers/mongoLogger");
const BadRequestError = require('../errors/BadRequestError')
const ConflictError = require('../errors/ConflictError')

class LoginController {
  async login(req, res, next) {
    try {
      const userExists = await userService.findByName(req.body.name)

      if (!userExists){
        return next(new BadRequestError("incorrect login or password"))
      }
        
      if (!userExists.validatePassword(req.body.password)){
        return next(new BadRequestError("incorrect login or password"))
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
      //console.log(error);
      next(error);
    }
  }
  

  async signup(req, res, next) {
    const userExists = await userService.findByName(req.body.name)
    if(userExists) return next(new ConflictError('User with name ' + req.body.name + ' already exists'))

    const userData = req.body;
    try {
      await authService.signUp(userData);
      res.status(200).json({ message:"Registration successful"});
    } catch (err) {
      //console.log(err);
      return next(err);
    }
  }
}

module.exports = new LoginController();
