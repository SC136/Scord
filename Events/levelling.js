const Levels = require('discord-xp');

const Discord = require('discord.js');

const { prefix } = require('../Configurations/Config.json');

const LevelUpSchema = require('../Models/LevelUp')

Levels.setURL(process.env.Scordmongouri);

module.exports = {

	name: 'message',

	async execute(message, client) {

		let data = await LevelUpSchema.findOne({ Guild: message.guild.id }).exec()

		if (!message.guild) return;

		if (message.author.bot) return;

		const randomAmountOfXp = Math.floor(Math.random() * 9) + 1;

		const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

		if (hasLeveledUp) {

			const user = await Levels.fetch(message.author.id, message.guild.id);

			const LevelUpEmbed = new Discord.MessageEmbed()

			.setTitle('Leveled up!')
			.setDescription(`\`\`\`apache\nHey ${message.author.tag}, congratulations!\nYou have just leveled up to level ▸ ${user.level}\`\`\``)
			.setFooter(`For ${message.author.tag} | Type '${prefix}level' or '${prefix}rank' | ©️ Scord`)
			.setColor(client.color);

			if (!data) return message.reply(`${message.author}`, LevelUpEmbed)

			const channel = message.guild.channels.cache.get(data.Channel)

			if (!channel || channel === null) return message.reply(`${message.author}`, LevelUpEmbed)
				
			channel.send(`${message.author}`, LevelUpEmbed)
		}
	},

};