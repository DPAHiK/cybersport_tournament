const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const Tournament = sequelize.define('tournaments', {


title:{
    type: Sequelize.STRING,
    allowNull: false
},

start_date:{
    type: Sequelize.DATE,
    allowNull: false
},

end_date:{
    type: Sequelize.DATE
},

organizer_id:{
    type: Sequelize.BIGINT,
    allowNull: false
},

is_began: {
    type: Sequelize.BOOLEAN
},
    
});

module.exports = Tournament;