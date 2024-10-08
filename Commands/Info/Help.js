const Discord = require('discord.js');

const { prefix } = require('../../Configurations/Config.json')

module.exports = {

	name: 'help',
	aliases: ['h'],
	description: 'Get started with the bot!',

	execute(client, message) {

		const helpembed = new Discord.MessageEmbed()

			.setAuthor(client.name, client.avatar, client.url)
			.setTitle('`Help command`')
			.setDescription('```m\nHello there!\nhere  is some help to get u started using me.\nWe will have some fun time!```')
			.addField('See all my categories ▸', `\`\`\`fix\n${prefix}categories\`\`\``)
			.addField('See all my commands ▸', `\`\`\`fix\n${prefix}commands\`\`\``)
			.addField('My links ▸', '**[Invite link](https://dsc.gg/scord "Invite me to your server!")  •  [Support server](https://discord.gg/UVWjuAh "Join my support server")  •  [Votting link](https://top.gg/bot/830000867205054484/vote "Vote for me")**')
			.setImage('https://i.imgur.com/mTeojYt.png')
			.setFooter(`Requested by ${message.author.username}  •  ©️ Scord`, message.author.avatarURL({ format: 'png', size: 1024, dynamic: true }))
			.setColor('#2f3136')
			.setTimestamp();

		message.channel.send(helpembed);

	},

};