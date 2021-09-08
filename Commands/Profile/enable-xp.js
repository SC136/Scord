const GuildSchema = require('../../Models/Guild');

module.exports = {

    name: 'enable-xp',
    aliases: ['on-xp', 'xp-on'],
    description: 'Enable or Disable the XP/Leveling System',
    guildOnly: true,

    async execute(client, message, args) {

        let data;

        data = await GuildSchema.findOne({
            Guild: message.guild.id
        })

        if (!data) {
            let GuildData = await GuildSchema.create({
                Guild: message.guild.id,
                Leveling: true
            })
            GuildData.save()
        } else {
            await GuildSchema.findOneAndUpdate({
                Guild: message.guild.id,
                Leveling: true
            })
        }

        message.channel.send(client.embed.send(message, 'Enable XP/Leveling', `XP/Leveling System was successfully Enabled for this server!`));

    },

};