const Discord = require('discord.js');

const Emoji = require('../../Utilities/emojis.json');

module.exports = {
	name: 'userinfo',
	aliases: ['memberinfo'],
	description: 'Displays information about a member',
	guildOnly: true,
	execute(client, message, args, member, prefix) {

		const user = member.user;

		const nick = {
			null: 'No nickname'
		};

		const nope = {
			false: 'Nope'
		}

		const status = {
			online: `${Emoji.online} Online`,
			idle: `${Emoji.idle} Idle`,
			dnd: `${Emoji.dnd} DND`,
			offline: `${Emoji.offline} Offline`
		};

    const flags = {
      DISCORD_EMPLOYEE: '<:DiscordStaff:810537983514116116>',
      DISCORD_PARTNER: '<:DiscordPartner:810538029114195999>',
      BUGHUNTER_LEVEL_1: '<:BugHunter:810537894246612995>',
      BUGHUNTER_LEVEL_2: '<:BugHunterLvl2:810537924315316264>',
      HYPESQUAD_EVENTS: '<:HypeSquad:807182171411316786>',
      HOUSE_BRAVERY: '<:HypeSquadBravery:807182213618860042>',
      HOUSE_BRILLIANCE: '<:HypeSquadBrilliance:807182257210916875> HypeSquad Brilliance',
      HOUSE_BALANCE: '<:HypeSquadBalance:807182235958247435>',
      EARLY_SUPPORTER: '<:EarlySupporter:810535663761096726>',
      TEAM_USER: 'Team User',
      SYSTEM: 'System',
      VERIFIED_BOT: '<:VerifiedBot:810535932888743946>',
      VERIFIED_DEVELOPER: '<:VerifiedBotDeveloper:810535327226920992>',
    };

    const badges = user.flags.toArray();

		const roles = member.roles.cache.map(r => `<@&${r.id}>`).join(' **•** ')

		const Userembed = new Discord.MessageEmbed()
		.setTitle('`Userinfo command`')
		.setThumbnail(user.avatarURL({ format: 'png', size: 4096, dynamic: true }))
		.addField('Username ▸', `\`\`\`${user.username}\`\`\``)
		.addField('ID ▸', `\`\`\`${user.id}\`\`\``, true)
		.addField('Nickname ▸', `\`\`\`${nick[member.nickname]}\`\`\`` || '```No nickname```', true)
		.addField('Discriminator ▸', `\`\`\`${user.discriminator}\`\`\``, true)
		.addField('Bot?', `\`\`\`${nope[user.bot]}\`\`\``, true)
		.addField('Status ▸', status[user.presence.status], true)
		.addField('Badges ▸', flags[badges.join(' **•** ')] || '```None```', true)
		.addField('Role color ▸', member.roles.color || '```None```', true)
		.addField('Highest role ▸', member.roles.highest, true)
		.addField('Roles ▸', roles || '```None```')
		.setFooter(`Requested By ${message.author.username}  •  ©️ Scord`, client.user.avatarURL())
		.setColor(client.color)
		.setTimestamp();

		message.channel.send(Userembed);

	},
};