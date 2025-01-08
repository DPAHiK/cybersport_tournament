const sequelize = require('./sequelize')
require('../models');

class DataBase{
    async connect(){

        try {
            await sequelize.authenticate();
            console.log("Ok");
        }
        catch(error){
            console.error("Error with connecting to db: ");
            throw new Error(error)
        }

        await sequelize.sync();
        console.log("Sync completed");

    }
}

module.exports = new DataBase();