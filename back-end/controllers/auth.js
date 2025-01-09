
const authService = require("../services/auth");
const userService = require('../services/user')
const jwt = require('jsonwebtoken')
const BadRequestError = require('../errors/BadRequestError')
const ConflictError = require('../errors/ConflictError')
const UnauthorizedError = require('../errors/UnauthorizedError')

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
      return next(err);
    }
  }

  async changePassword(req, res, next) {
    try {
    const token = req.headers['authorization'];

    jwt.verify(token, 'secret', async (err, decoded) => {
      if (err) {
        return next(new UnauthorizedError('Invalid token'))
      }

      //console.log(decoded)
      
      const userData = req.body;
      await userService.update(decoded.id, {password: userData.newPassword});
      res.status(200).json({ message:"Password changed"});
    });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new LoginController();
