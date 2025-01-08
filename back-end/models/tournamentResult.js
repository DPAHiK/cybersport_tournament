const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const TournamentResult = sequelize.define('tournament_results', {
            
            tournament_id:{
                type: Sequelize.BIGINT,
                allowNull: false
            },
            
            team_id:{
                type: Sequelize.BIGINT,
                allowNull: false
            },

            place:{
                type: Sequelize.BIGINT,
                allowNull: false
            }
                
});

module.exports = TournamentResult;