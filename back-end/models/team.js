const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Team = sequelize.define('teams', {


name:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
},

creator_id:{
    type: Sequelize.BIGINT,
    allowNull: false
}
    
});

module.exports = Team;