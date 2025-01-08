
const jwt = require('jsonwebtoken')

module.exports = (role) => {
  return (req, res, next) => {

    const token = req.headers['authorization'];
    //console.log(token)
  
      const decoded = jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        
        if(!role) return next()

        if(decoded.role == role || decoded.role == 'ROLE_ADMIN') return next()

        return res.status(403).json({ message: 'Not enough rights' });
        
        //req.user = decoded; 
        //console.log(decoded)
        //next();
      });

  };
}
  