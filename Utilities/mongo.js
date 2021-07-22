const mongo = require('mongoose')

module.exports = {
    init: () => {
        const DBOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }

        mongo.connect(process.env.Scordmongouri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,            
        })
        mongo.Promise = global.Promise
        // mongo.set('useCreateIndex', true);


        mongo.connection.on('connected', () => {
        console.log('Sucessfully Connected To MongoDB')
        })

        mongo.connection.on('disconnected', () => {
            console.log('Disconnected From MongoDB')
        })

        mongo.connection.on('err', (err) => {
            console.log(`MongoDB Error: ${err}`)
        })

    }
}