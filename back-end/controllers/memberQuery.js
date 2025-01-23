const MemberQueryService = require('../services/memberQuery')
const TeamMemberService = require('../services/teamMember')
const NotFoundError = require('../errors/NotFoundError')
const UnauthorizedError = require('../errors/UnauthorizedError')
const jwt = require('jsonwebtoken')

class MemberQueryController{

    async findByTeamId(req, res, next){
        try{
            const teamId = req.params.teamId;

            const result = await MemberQueryService.findByTeamId(teamId)
            if(result.length) return res.json(result)

            return next(new NotFoundError('Member queries on team with ID ' + teamId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }
    

    async create(req, res, next){
        try{
            const token = req.headers['authorization'];
            const userData = req.body;

            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                  return next(new UnauthorizedError('Invalid token'))
                }
                
                userData.user_id = decoded.id
              
              });
              
            res.json(await MemberQueryService.create(userData))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async deleteWithAccept(req, res, next){
        try{
            
            const queryId = req.params.queryId;
            const query = await MemberQueryService.findById(queryId)

            if(!query) return next(new NotFoundError('Member query with ID ' + queryId + ' not found'))

            TeamMemberService.create({team_id: query.team_id, user_id: query.user_id})

            const result = await MemberQueryService.delete(queryId)
            return res.json(result)
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }

    async delete(req, res, next){
        try{
            const queryId = req.params.queryId;

            const result = await MemberQueryService.delete(queryId)
            if(result) return res.json(result)

            return next(new NotFoundError('Member query with ID ' + queryId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new MemberQueryController()