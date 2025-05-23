const TeamService = require('../services/team')
const TeamMemberService = require('../services/teamMember')
const ConflictError = require('../errors/ConflictError')
const NotFoundError = require('../errors/NotFoundError')
const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/UnauthorizedError')
const ForbiddenError = require('../errors/ForbiddenError')

class TeamController{
    async list(req, res, next){
        try{
            res.json(await TeamService.list())
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async findById(req, res, next){
        try{
            const teamId = req.params.teamId;

            if(teamId == 'query') return next()

            const result = await TeamService.findById(teamId)
            if(result) return res.json(result)

            return next(new NotFoundError('Team with ID ' + teamId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }
    }

    async create(req, res, next){
        const teamExists = await TeamService.findByName(req.body.name)
        if(teamExists) return next(new ConflictError('Team with name ' + req.body.name + ' already exists'))

        try{
            const teamData = req.body;

            const token = req.headers['authorization']; 
            jwt.verify(token, 'secret', async (err, decoded) => {
                if (err) {
                  return next(new UnauthorizedError('Invalid token'))
                }
                if(!decoded) return next(new ForbiddenError('Not enough rights'));

                teamData.creator_id = decoded.id
              });

              const result = await TeamService.create(teamData)

              const newTeam = await TeamService.findByName(teamData.name)
              TeamMemberService.create({team_id: newTeam.id, user_id: teamData.creator_id})
              
              res.json(result)
            
        }
        catch(err){
            return next(err)
        }
    }

    async update(req, res, next){
        try{
            const teamData = req.body;
            const teamId = req.params.teamId;

            const result = await TeamService.update(teamId, teamData)
            if(result[0]) return res.json(result)

            return next(new NotFoundError('Team with ID ' + teamId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }       
    }

    async delete(req, res, next){
        try{
            const teamId = req.params.teamId;

            const result = await TeamService.delete(teamId)
            if(result) return res.json(result)

            return next(new NotFoundError('Team with ID ' + teamId + ' not found'))
        }
        catch(err){
            console.log(err)
            return next(err)
        }          
    }
}

module.exports = new TeamController()