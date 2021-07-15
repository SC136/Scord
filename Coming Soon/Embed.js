const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	execute(client, message) {

		const embed = new Discord.MessageEmbed()

		.setAuthor('This is a author')
		.setTitle('This is a title')
		.setDescription('This is a description')
		.addField('This is a field name', 'This is a field value')
		.setFooter('This is a footer')

		message.channel.send(embed);
	},
};