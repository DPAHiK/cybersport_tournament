
const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/UnauthorizedError')
const ForbiddenError = require('../errors/ForbiddenError')

module.exports = (role) => {
  return (req, res, next) => {

    const token = req.headers['authorization'];
    //console.log(token)
  
      const decoded = jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
          return next(new UnauthorizedError('Invalid token'))
        }
        
        if(!role) return next()

        if(decoded.role == role || decoded.role == 'ROLE_ADMIN') return next()

        return next(new ForbiddenError('Not enough rights'));
      
      });

  };
}
  