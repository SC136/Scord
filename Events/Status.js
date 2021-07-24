const Config = require('../Configurations/Config.json');

module.exports = {

	name: 'ready',
	once: true,

	execute(client) {

		client.user.setActivity(`${Config.prefix}help`, { type: 'LISTENING' });

	},

};