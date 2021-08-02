const Discord = require('discord.js');

module.exports = {

	name: 'supportserver',
	aliases: ['support-server', 'support'],
	description: 'Get the invite link of the support server for me',
	cooldown: 10,

	execute(client, message) {

		const serverembed = new Discord.MessageEmbed()
			.setTitle('`Support server command`')
			.setDescription('```apache\nHere is the link to my support server!\nSo if you have any problems using me then u can join!\nYou will get help there for sure!```\n▸ [**Support server invite link**](https://discord.gg/UVWjuAh "Click here to join my support server!")')
			.setFooter(`Requested By ${message.member.displayName} | ©️ Scord`)
			.setColor(client.color)

		message.channel.send(serverembed);
	},
	
};