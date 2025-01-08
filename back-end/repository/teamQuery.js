
const TeamQuery = require('../models/teamQuery')

const sequelize = require('../database/sequelize');
const { Sequelize } = require('sequelize');

class TeamQueryRepository{
    findByTeamId(teamId){
        return sequelize.query(`
            SELECT team_query.id, team_query.team_id, team_query.sending_date, team_query.description, team_query.status
            FROM team_query
            WHERE team_query.team_id = ` + teamId
            ,{
                type: Sequelize.QueryTypes.SELECT
            })
    }

    list(){
        return sequelize.query(`
            SELECT team_query.id, team_query.team_id, team_query.sending_date, team_query.description, team_query.status
            FROM team_query`
            ,{
                type: Sequelize.QueryTypes.SELECT
            })
    }

    findById(id){
        return TeamQuery.findOne({where: {id: id}})
    }

    async create(teamData){
        let team = null;

        try{
            team = await TeamQuery.create(teamData)
        }
        catch(err){
            throw new Error("Failed to create teamQuery");
        }

        return team;
    }

    async delete(id){
        return await TeamQuery.destroy({where: {id: id}})
    }
}

module.exports = new TeamQueryRepository()