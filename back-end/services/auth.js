const User = require("../repository/user");

class AuthService {

  async signUp(userData) {
    if(!userData.role) userData.role = "ROLE_PLAYER"
    await User.create(userData);

  }

  async login(name, password, next) {

    const user = await User.findByName(name);

    //console.log(user)

    if (!user || !user.validatePassword(password)) {

      return next(new Error("Wrong name or password"), false);

    }



    return next(null, user);
    
  }
}

module.exports = new AuthService();
