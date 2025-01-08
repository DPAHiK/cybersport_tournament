const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');


const TeamMember = sequelize.define('team_members', {


team_id:{
    type: Sequelize.BIGINT,
    allowNull: false
},

user_id:{
    type: Sequelize.BIGINT,
    allowNull: false
}
    
});

module.exports = TeamMember;