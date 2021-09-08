const GuildSchema = require('../../Models/Guild');

module.exports = {

    name: 'disable-xp',
    aliases: ['off-xp', 'xp-off'],
    description: 'Disable the XP/Leveling System',
    permissions: 'MANAGE_GUILD',
    guildOnly: true,

    async execute(client, message, args) {

        let data;

        data = await GuildSchema.findOne({
            Guild: message.guild.id
        })

        if (!data) {
            let GuildData = await GuildSchema.create({
                Guild: message.guild.id,
                Leveling: false
            })
            GuildData.save()
        } else {
            await GuildSchema.findOneAndUpdate({
                Guild: message.guild.id,
                Leveling: false
            })
        }

        message.channel.send(client.embed.send(message, 'Enable XP/Leveling', `XP/Leveling System was successfully Disabled for this server!\n\nIf you want to Enable it again then use '!enable-xp'`));

    },

};