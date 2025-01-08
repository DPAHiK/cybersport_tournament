const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const EngagedTeam = sequelize.define('engaged_teams', {

    
    tournament_id:{
        type: Sequelize.BIGINT,
        allowNull: false
    },

    team_id:{
        type: Sequelize.BIGINT,
        allowNull: false
    },

    team_grid_status:{
        type: Sequelize.STRING,
        allowNull: false
    }
        
    });

module.exports = EngagedTeam;