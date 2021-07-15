const Levels = require('discord-xp');

module.exports = {

	name: 'rank',
	aliases: ['rnk'],
	description: 'Shows your current rank!',
	guildOnly: true,

	async execute(client, message, args, member) {

		const User = await Levels.fetch(member.user.id, message.guild.id, true);

		if (!User) return message.reply(client.error.setDescription('```Seems like this member doesn\'t have a profile :(```'));

		const RankEmbed = new client.discord.MessageEmbed()

		// .setAuthor()
			.setDescription(`Rank - ${parseInt(User.position)}`)
			.setTimestamp();

		message.reply(RankEmbed);

	},
};