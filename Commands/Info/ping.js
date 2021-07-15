const Discord = require('discord.js');

module.exports = {

	name: 'ping',
	description: 'Get the bot latency!',
	cooldown: 5,

	execute(client, message) {

		let pingembed = new Discord.MessageEmbed()

			.setAuthor(client.name, client.avatar, client.url)
			.setTitle('`Ping command⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`')
			.setDescription(`\`\`\`apache\nMy latency is ${client.ws.ping}MS!\`\`\``)
			.setFooter(`Requested By ${message.author.username}  •  ©️ Scord`, message.author.avatarURL())
			.setColor(client.color)
			.setTimestamp();

		message.channel.send(pingembed);

	},

};