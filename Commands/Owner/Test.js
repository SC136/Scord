const bruh = require('../../Utilities/Error.js');

module.exports = {

	name: 'test',
	description: 'for testing purposes...',
	ownerOnly: true,

	execute(client, message, args) {

		message.channel.send(client.embed.send(message, 'test', args))

	},
};