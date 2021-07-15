const Discord = require('discord.js');

const Config = require('../Configurations/config.json');

module.exports = {
	name: 'guildCreate',
	execute(guild, client) {
		
        const logchannel = client.channels.cache.get(Config.logchannelid);
	},
};