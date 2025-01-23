
const teamRepository = require('../repository/team')
const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/UnauthorizedError')
const ForbiddenError = require('../errors/ForbiddenError')

module.exports = async (req, res, next) => {
    const token = req.headers['authorization'];
    jwt.verify(token, 'secret', async (err, decoded) => {
      if (err) {
        return next(new UnauthorizedError('Invalid token'))
      }
      if(!decoded) return next(new ForbiddenError('Not enough rights'));
            
      const team = await teamRepository.findById(req.params.teamId)
      if (team && team.creator_id == decoded.id || decoded.role == "ROLE_ADMIN") return next()    
      else {
          return next(new ForbiddenError('Not enough rights'));
      }
    });

  };
  