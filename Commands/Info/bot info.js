const Discord = require('discord.js');

const { prefix } = require('../..//Configurations/Config.json');

const { version } = require(process.cwd() + '/package.json');

const creator = 'SC#0600';

module.exports = {

	name: 'botinfo',
	aliases: ['clientinfo', 'bi', 'ci'],
	description: 'Get some info about the bot',

	execute(client, message) {

		let Botembed = new Discord.MessageEmbed()

			.setTitle('`Bot info command`')
			.setDescription(`\`\`\`apache\nHere is some info about me!\nso you can know more about me!\`\`\``)
			.addField('Name ▸', `\`\`\`${client.user.username}\`\`\``, true)
			.addField('ID ▸', `\`\`\`${client.user.id}\`\`\``, true)
			.addField('Am I a bot?', '```Obviously```', true)
			.addField('Discriminator ▸', `\`\`\`${client.user.discriminator}\`\`\``, true)
			.addField('Prefix ▸', `\`\`\`${prefix}\`\`\``, true)
			.addField('Version ▸', `\`\`\`${version}\`\`\``, true)
			.addField('Server count ▸', `\`\`\`${client.guilds.cache.size}\`\`\``, true)
			.addField('User count ▸', `\`\`\`${client.users.cache.size}\`\`\``, true)
			.addField('Channel count ▸', `\`\`\`${client.channels.cache.size}\`\`\``, true)
			.addField('Emoji count ▸', `\`\`\`${client.emojis.cache.size}\`\`\``, true)
			.addField('Status ▸', `\`\`\`${client.user.presence.status}\`\`\``, true)
			.addField('Developer ▸', `\`\`\`css\n${creator}\`\`\``, true)
			.addField('Created at ▸', `\`\`\`${client.user.createdAt}\`\`\``, true)
			.setFooter(`Requested By ${message.author.username}  •  ©️ Scord`, message.author.avatarURL({ format: 'png', size: 1024, dynamic: true }))
			.setColor('#2f3136')
			.setTimestamp();

		message.channel.send(Botembed);

	},

};