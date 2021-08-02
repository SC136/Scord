const Discord = require('discord.js');

const Emoji = require('../../Utilities/emojis.json');

const Moment = require('moment');

module.exports = {

  name: 'serverinfo',
  aliases: ['guildinfo', 'si'],
  description: 'Shows information about the current server',
  guildOnly: true,

  execute(client, message, args, member) {

    const server = message.guild;

    const verificationLevels = {

      NONE: 'None',
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: 'High',
      VERY_HIGH: 'Highest'

    };

    const notifications = {

      ALL: '```All```',
      MENTIONS: '```Mentions```'

    };

    const truefalse = {

      true: 'Yep',
      false: 'Nope'

    };

    const members = message.guild.members.cache.array();
    const memberCount = members.length;
    const online = members.filter((m) => m.presence.status === 'online').length;
    const offline = members.filter((m) => m.presence.status === 'offline').length;
    const dnd = members.filter((m) => m.presence.status === 'dnd').length;
    const afk = members.filter((m) => m.presence.status === 'idle').length;
    const bots = members.filter(b => b.user.bot).length;

    const serverinfoembed = new Discord.MessageEmbed()

      .setAuthor(client.name, client.avatar, client.url)
      .setTitle('`Serverinfo command⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`')
      .setDescription('```js\nHere is some information about this server!```')
      .addField(`${Emoji.name} Server name ▸`, `\`\`\`${server.name}\`\`\``)
      .addField(`${Emoji.id} Server ID ▸`, `\`\`\`${server.id}\`\`\``, true)
      .addField(`${Emoji.shield} Verification level ▸`, `\`\`\`${verificationLevels[server.verificationLevel]}\`\`\``, true)
      .addField(`${Emoji.partner} Partnered ▸`, `\`\`\`${truefalse[server.partnered]}\`\`\``, true)
      .addField(`${Emoji.verify} Verified ▸`, `\`\`\`${truefalse[server.verified]}\`\`\``, true)
      .addField(`${Emoji.members} Total members ▸`, `\`\`\`${memberCount}\`\`\``, true)
      .addField(`${Emoji.online} Online members ▸`, `\`\`\`${online}\`\`\``, true)
      .addField(`${Emoji.idle} Idle members ▸`, `\`\`\`${afk}\`\`\``, true)
      .addField(`${Emoji.dnd} DND members ▸`, `\`\`\`${dnd}\`\`\``, true)
      .addField(`${Emoji.offline} Offline members ▸`, `\`\`\`${offline}\`\`\``, true)
      .addField(`${Emoji.bot} Server bots ▸`, `\`\`\`${bots}\`\`\``, true)
      .addField(`${Emoji.role} Server roles ▸`, `\`\`\`${server.roles.cache.size}\`\`\``, true)
      .addField(`${Emoji.region}Server region ▸`, `\`\`\`${server.region}\`\`\``, true)
      .addField(`${Emoji.owner} Server owner ▸`, server.owner, true)
      .addField(`${Emoji.rules} Rules channel`, (message.guild.rulesChannel) ? `${message.guild.rulesChannel}` : '```None```', true)
      .addField(`${Emoji.system} System channel ▸`, (message.guild.systemChannel) ? `${message.guild.systemChannel}` : '```None```', true)
      .addField(`${Emoji.voice} AFK channel ▸`, (message.guild.afkChannel) ? `${message.guild.afkChannel}` : '```None```', true)
      .addField(`${Emoji.timer} AFK timeout`, (message.guild.afkChannel) ? `\`\`\`${Moment.duration(message.guild.afkTimeout * 1000).asMinutes()} Minutes\`\`\`` : '```None```', true)
      .addField(`${Emoji.ping} Default notifications ▸`, notifications[message.guild.defaultMessageNotifications], true)
      .setFooter(`Requested By ${member.displayName}  •  ©️ Scord`, member.user.avatarURL({ format: 'png', size: 1024, dynamic: true }))
      .setColor(client.color)
      .setTimestamp();

    message.channel.send(serverinfoembed);

  },

};