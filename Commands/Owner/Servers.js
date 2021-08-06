const { MessageEmbed } = require('discord.js');

module.exports = {

  name: 'servers',
  aliases: ['servs'],
  description: 'Shows all the servers the bot is in',
  ownerOnly: true,

  execute(client, message) {

    const servers = client.guilds.cache;

    const embed = new MessageEmbed()

      .setTitle('`Server list`')
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setColor(client.color)
      .setTimestamp()

    let description = "";

    servers.forEach((guild) => {
      description += `\`\`\`apache\n${guild.name} • ${guild.id} • ${guild.members.cache.size} members\n\`\`\``;
    });

    embed.setDescription(description);

    message.channel.send({ embed });
  },

};