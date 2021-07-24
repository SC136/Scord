const Mongoose = require('mongoose');

const Schema = new Mongoose.Schema({

	User: String,
	Bio: String,

});

module.exports = Mongoose.model('Profile', Schema);