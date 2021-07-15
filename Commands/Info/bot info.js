const Discord = require('discord.js');

const { prefix } = require('../..//Configurations/Config.json');

const { version } = require(process.cwd() + '/package.json');

const creator = 'SC#0600';

module.exports = {

	name: 'botinfo',
	aliases: ['clientinfo', 'bi', 'ci'],
	description: 'Get some info about the bot',
	cooldown: 5,

	execute(client, message) {

		let Botembed = new Discord.MessageEmbed()

			.setTitle('Bot info command')
			.setDescription(`\`\`\`apache\nHere is some info about me!\nso you can know more about me!\`\`\``)
			.addField('My name ▸', `\`\`\`${client.user.username}\`\`\``, true)
			.addField('My id ▸', `\`\`\`${client.user.id}\`\`\``, true)
			.addField('Am I a bot?', '```Obviously```', true)
			.addField('Discriminator ▸', `\`\`\`${client.user.discriminator}\`\`\``, true)
			.addField('My prefix ▸', `\`\`\`${prefix}\`\`\``, true)
			.addField('The version I am running ▸', `\`\`\`${version}\`\`\``, true)
			.addField('My server count ▸', `\`\`\`${client.guilds.cache.size}\`\`\``, true)
			.addField('My users ▸', `\`\`\`${client.users.cache.size}\`\`\``, true)
			.addField('My channels ▸', `\`\`\`${client.channels.cache.size}\`\`\``, true)
			.addField('My emojis ▸', `\`\`\`${client.emojis.cache.size}\`\`\``, true)
			.addField('My status ▸', `\`\`\`${client.user.presence.status}\`\`\``, true)
			.addField('I was made by ▸', `\`\`\`css\n${creator}\`\`\``, true)
			.addField('I was made on ▸', `\`\`\`${client.user.createdAt}\`\`\``, true)
			.setFooter(`Requested By ${message.author.username}  •  ©️ Scord`, message.author.avatarURL({ format: 'png', size: 1024, dynamic: true }))
			.setColor('#2f3136')
			.setTimestamp();

		message.channel.send(Botembed);

	},

};