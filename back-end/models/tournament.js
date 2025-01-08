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

query_id:{
    type: Sequelize.BIGINT,
    allowNull: false
},

organizer_id:{
    type: Sequelize.BIGINT,
    allowNull: false
}
    
});

module.exports = Tournament;