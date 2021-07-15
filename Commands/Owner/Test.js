const bruh = require('../../bruh')

module.exports = {
	name: 'test',
	ownerOnly: true,
	execute(client, message, args) {

		console.log(bruh.errorTest())

	},
};