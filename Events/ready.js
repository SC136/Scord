const config = require('../Configurations/Config.json');

const Discord = require('discord.js');

const Utility = require('../Utilities/utility.json');

const Chalk = require('chalk');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

		console.log(Chalk.green('▸') + Chalk.hex('#7289da')(` ${client.user.username}`) + Chalk.hex('#fee75c')(' is ready') + Chalk.red('!'));

		const logchannel = client.channels.cache.get(config.logchannelid);

		const user = client.user;

		logchannel.send(

			new Discord.MessageEmbed()

				.setAuthor(user.username, user.avatarURL({ type: 'png', size: 1024 }), Utility.url)
				.setTitle('`Ready!`')
				.setDescription('```I am ready!```')
				.addField('Servers ▸', `\`\`\`${client.guilds.cache.size}\`\`\``)
				.addField('Users ▸', `\`\`\`${client.users.cache.size}\`\`\``)
				.setFooter('Restart log')
				.setColor(client.color)

		);
	},
};