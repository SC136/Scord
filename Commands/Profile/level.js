const Levels = require('discord-xp');

const Discord = require('discord.js');

const GuildSchema = require('../../Models/Guild');

module.exports = {

	name: 'level',
	aliases: ['lvl'],
	description: 'Shows your current level in the server',
	guildOnly: true,

	async execute(client, message, args, member, prefix) {

		let enabled = await GuildSchema.findOne({ Guild: message.guild.id }).exec()

		if (!enabled || !enabled.Leveling) return message.reply(`XP/Leveling System is Disabled in this Server ask a Admin or a Mod to Enable it using \`!enable-xp\``)

		const user = await Levels.fetch(member.user.id, message.guild.id);

		if (!user) return message.reply(client.error.send('This member doesn\'t have ant level'));

		const levelembed = new Discord.MessageEmbed()

			.setAuthor(client.user.username, client.user.avatarURL({ format: 'png', size: 1024 }))
			.setTitle('`Level command`')
			.setDescription(`\`\`\`apache\nYour current level ▸ ${user.level}\`\`\``)
			.setFooter(`Requested by ${message.author.username}  •  ${prefix}level @Member  •  ©️ Scord`, member.user.avatarURL())
			.setColor(client.color)

		message.channel.send(levelembed);

	},

};