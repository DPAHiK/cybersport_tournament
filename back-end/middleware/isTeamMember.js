// сделать
const teamMember = require('../repository/teamMember')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    //console.log(req.session.user.id)
    //console.log(req.params.id)
        const token = req.headers['authorization'];
        //console.log(token)
      
          const decoded = jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Failed to authenticate token' });
            }
            if(!decoded) next(new Error("Not enough rights"));

            const member = await teamMember.findByUserId(decoded.id)
            console.log(decoded)
            if (member && member.team_id == req.params.id || decoded.role == "ROLE_ADMIN") next()    
            else {
              next(new Error("Not enough rights"));
            }
          });

  };
  