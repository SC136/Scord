const Discord = require('discord.js');

module.exports = {

	name: 'invite',
	aliases: ['inv', 'inviteme', 'botinvite'],
	description: 'Get the invite link to invite me!',
	cooldown: 10,

	execute(client, message) {

		const inviteembed = new Discord.MessageEmbed()

			.setAuthor(client.name, client.avatar, client.url)
			.setTitle('`Invite command⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀`')
			.setDescription('```apache\nHere is the link to invite me!\nSo you can also have me in your server!\nI will be more than happy to join!``` \n ▸ [**Invite link**](https://scordbot.ml/invite "Click here to invite me!") \n\n ▸ [**Alternate invite link**](https://dsc.gg/scord "Click here to invite me!")')
			.setFooter(`Requested By ${message.author.username}  •  ©️ Scord`, message.author.avatarURL({ format: 'png', size: 1024, dynamic: true }))
			.setColor('#2f3136');

		message.channel.send(inviteembed);

	},

};