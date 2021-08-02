const Discord = require('discord.js');

const Config = require('../Configurations/Config.json');

module.exports = {

	name: 'guildCreate',

	execute(guild, client) {
		
        const logchannel = client.channels.cache.get(Config.logchannelid);

        logchannel.send(
    new Discord.MessageEmbed()
      .setTitle('`I was added in new server!`')
      .setDescription('```apache\nHere is some information about the new server ▸```')
      .setThumbnail(guild.iconURL({ format: 'png', size: 4096, dynamic: true }))
      .addField("Name ▸", `\`\`\`${guild.name}\`\`\``, true)
      .addField("ID ▸", `\`\`\`${guild.id}\`\`\``, true)
      .addField("Members ▸", `\`\`\`${guild.memberCount}\`\`\``, true)
      .addField("Emojis ▸", `\`\`\`${guild.emojis?.cache.size}\`\`\``, true)
      .addField("Channels ▸", `\`\`\`${guild.channels.cache.size}\`\`\``, true)
      .addField("Owner ID ▸", `\`\`\`${guild.ownerID}\`\`\``, true)
      .addField("Owner ▸", `${guild.owner}`, true)
      .setFooter(`Currently in ${client.guilds.cache.size} servers!`)
      .setTimestamp()
      .setColor('#2F3136')
        	);

	},
};