
const userRepository = require('../repository/user')
const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/UnauthorizedError')
const ForbiddenError = require('../errors/ForbiddenError')

module.exports = async (req, res, next) => {
        const token = req.headers['authorization'];
      
          const decoded = jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
              return next(new UnauthorizedError('Invalid token'))
            }
            if(!decoded) return next(new ForbiddenError('Not enough rights'));

            const user = await userRepository.findById(decoded.id)


            if (user && user.validatePassword(req.body.oldPassword)) return next()    
            else {
              return next(new ForbiddenError('Invalid password'));
            }
          });

  };
  