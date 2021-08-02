const Discord = require('discord.js');

const Levels = require('discord-xp');

const Utility = require('../../Utilities/utility.json');

const ProfileSchema = require('../../Models/Profile');

module.exports = {

	name: 'profile',
	aliases: ['prof'],
	description: 'Shows your profile',
	guildOnly: true,

	async execute(client, message, args, member, prefix) {

		const User = await Levels.fetch(member.user.id, message.guild.id, true);

		if (!User) return message.reply(client.error.send('Seems like this member doesn\'t have a profile yet :('));

		let data = await ProfileSchema.findOne({ User: member.id }).exec()
		let bio;
		if (data) {
			bio = data.Bio;
		} else {
			bio = 'Bio not set • Set using `!set-bio`';
		}

		let Avatar = member.user.avatarURL({ format: 'png', size: 1024, dynamic: true });

		const ProfileEmbed = new Discord.MessageEmbed()
			.setAuthor(client.user.username, client.user.avatarURL({ type: 'png', size: 1024 }), Utility.url)
			.setTitle('`Profile command`')
			.setThumbnail(Avatar)
			.setDescription('```apache\nHey! here is your awesome profile!```')
			.addField('Name ▸', `\`\`\`${member.displayName}\`\`\``)
			.addField('Bio ▸', bio)
			.addField('Level ▸', `\`\`\`${User.level}\`\`\``, true)
			.addField('Rank ▸', `\`\`\`${parseInt(User.position)}\`\`\``, true)
			.addField('XP ▸', `\`\`\`${User.xp}\`\`\``, true)
			.setFooter(`Requested by ${member.user.username}  •  ${prefix}profile @Member  •  ©️ Scord`)
			.setColor(client.color)
			.setTimestamp()

		message.channel.send(ProfileEmbed);

	},
	
};