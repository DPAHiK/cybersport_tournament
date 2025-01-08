const Error = require("../repository/error");
const Event = require("../repository/event");
const jwt = require('jsonwebtoken')

class MongoLogger {

    async storeError(err) {

        try{

            let error = new Error({

                date: new Date(),

                text: err.message,

                code: err.status,

                route: err.route,

            });

            await error.save();

        }catch(err) {

            console.log(err);

        }

    }

    async storeEvent(req, res, next) {

        const token = req.headers['authorization'];
        let id;
        const decoded = jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                  console.log("Unable to decode token")
                  return
                }
                //console.log(decoded)
                id = decoded.id;
            })

            

        try{

            let event = new Event({

                date: new Date(),

                route: req.path,

                userId: id ? id : 0,

                method: req.method,

                body: req.body || null,

                params: req.params || null,

                query: req.query || null

            });

            await event.save();

            next();

        }catch(err) {

            console.log(err);

        }
    }

}

module.exports = new MongoLogger();