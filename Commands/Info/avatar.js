module.exports = {

    name: `avatar`,
    aliases: [`av`],
    description: `Shows the avatar of the mentioned member or yours`,
    usage: ` • !avatar <@Member>`,
    guildOnly: true,

    execute(client, message, args, member) {

        const user = member.user;

        const avatarEmbed = new client.discord.MessageEmbed()
            .setAuthor(client.name, client.avatar, client.url)
            .setTitle('`Avatar command`')
            .setDescription(`\`\`\`Here is the avatar of ${user.tag} ▸`)
            .addField(`Avatar links ▸`, `[webp](${user.avatarURL()}) • [png](${user.avatarURL({ format: `png` })}) • [jpg](${user.avatarURL({ format: `jpg` })}) • [jpeg](${user.avatarURL({ format: `jpeg` })})`)
            .setImage(user.avatarURL({ format: `png`, size: 4096 }))
            .setFooter(`Requested By ${message.author.username}  •  ©️ Scord`, message.author.avatarURL())
            .setColor(client.color)
            .setTimestamp();

        message.channel.send(avatarEmbed);

    },

};