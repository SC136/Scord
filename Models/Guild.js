const Mongoose = require('mongoose');

const Schema = new Mongoose.Schema({

    Guild: String,
    Leveling: Boolean

});

module.exports = Mongoose.model('Guild', Schema);