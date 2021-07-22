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
			if (!data) return message.reply('ok bruh')
			const channel = message.guild.channels.cache.get(data.Channel)
			if (!channel || channel === null) return message.reply('ok yes')
			channel.send('it worked!')
		}
	}
};