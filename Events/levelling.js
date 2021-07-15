const Levels = require('discord-xp');

const Discord = require('discord.js');

const { prefix } = require('../Configurations/Config.json');

Levels.setURL(process.env.Scordmongouri);

module.exports = {
	name: 'message',
	async execute(message, client) {

		if (!message.guild) return;

		if (message.author.bot) return;

		const randomAmountOfXp = Math.floor(Math.random() * 9) + 1;

		const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

		if (hasLeveledUp) {

			const user = await Levels.fetch(message.author.id, message.guild.id);

			message.channel.send(

				new Discord.MessageEmbed()

					.setTitle('Leveled up!')
					.setDescription(`\`\`\`apache\nHey ${message.author.tag}, congratulations!\nYou have just leveled up to ${user.level}\`\`\``)
					.setFooter(`For ${message.author.tag} | Type '${prefix}level' or '${prefix}rank' | ©️ Scord`)
					.setColor(client.color)

			);
		}
	}
};