const Discord = require('discord.js');

const Levels = require('discord-xp');

module.exports = {
	name: 'leaderboard',
	aliases: 'lb',
	guildOnly: true,
	async execute(client, message) {

		const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

		if (rawLeaderboard.length < 1) return reply('Nobody is in the leaderboard yet');

		const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

		const lb = leaderboard.map(e => `${e.position} - ${e.username}#${e.discriminator}\nLevel ▸ ${e.level}\nXP ▸ ${e.xp.toLocaleString()}`);

		const lbembed = new Discord.MessageEmbed()
			.setTitle('`Leaderboard`')
			.setDescription(`\`\`\`apache\n${lb.join("\n\n")}\`\`\``)
			.setFooter(`Requested By ${message.author.username} | ©️ Scord`, client.user.avatarURL())
			.setColor(client.color)

		message.channel.send(lbembed);
	},
};