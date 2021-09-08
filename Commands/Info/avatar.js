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
            .setDescription(`\`\`\`Here is the Avatar of ${user.tag} ▸\`\`\``)
            .addField(`Avatar Links ▸`, `[webp](${user.avatarURL()})  •  [png](${user.avatarURL({ format: `png` })})  •  [jpg](${user.avatarURL({ format: `jpg` })})  •  [jpeg](${user.avatarURL({ format: `jpeg` })})  •  [gif](https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.gif)`)
            .setImage(user.avatarURL({ format: `png`, size: 4096, dynamic: true }))
            .setFooter(`Requested By ${message.author.username}  •  ©️ Scord`, message.author.avatarURL({ format: `png`, size: 4096, dynamic: true }))
            .setColor(client.color)
            .setTimestamp();

        message.channel.send(avatarEmbed);

    },

};