// сделать
const teamMember = require('../repository/teamMember')
const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/UnauthorizedError')
const ForbiddenError = require('../errors/ForbiddenError')

module.exports = async (req, res, next) => {
    //console.log(req.session.user.id)
    //console.log(req.params.id)
        const token = req.headers['authorization'];
        //console.log(token)
      
          const decoded = jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
              return next(new UnauthorizedError('Failed to authenticate token'))
            }
            if(!decoded) return next(new ForbiddenError('Not enough rights'));

            const member = await teamMember.findByUserId(decoded.id)
            //console.log(decoded)
            if (member && member.team_id == req.params.id || decoded.role == "ROLE_ADMIN") return next()    
            else {
              return next(new ForbiddenError('Not enough rights'));
            }
          });

  };
  