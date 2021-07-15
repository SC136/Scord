module.exports = {

	name: 'say',
	description: 'says what you want',
	args: true,
	usage: '<something>',
	cooldown: 5,
	guildOnly: true,

	execute(client, message, args) {

		const sayembed = new client.discord.MessageEmbed()

			.setAuthor(client.name, client.avatar, client.url)
			.setTitle('`Say command`')
			.setDescription(`\`\`\`${args.join(' ')}\`\`\``)
			.setFooter(`Said by ${message.member.displayName} | ©️ Scord`, message.author.avatarURL({ type: 'png', size: 1024, dynamic: true }))
			.setColor(client.color);

		message.channel.send(sayembed);

	},

};