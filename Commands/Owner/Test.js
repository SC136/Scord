const bruh = require('../../Utilities/Error.js');

module.exports = {
	name: 'test',
	ownerOnly: true,
	execute(client, message, args) {

		message.channel.send(client.embed.send(message, '', 'this is description', 'this is footer'))

	},
};