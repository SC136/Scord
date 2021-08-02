const LevelUpSchema = require('../../Models/LevelUp');

module.exports = {

    name: 'set-level-up-channel',
    aliases: ['set-lvl-up-channel', 's-lvl-up-chl'],
    description: 'Sets Level Up Channel',
    permissions: 'MANAGE_GUILD',
    args: true,
    usage: '<#Channel>',
    guildOnly: true,

    async execute(client, message, args) {

        const channel = message.mentions.channels.first();

        if (!channel) return message.reply(client.error.send('You need to mention a valid channel to set level up messages!'))

        let data;
        data = await LevelUpSchema.findOne({
            Guild: message.guild.id
        })

        if (!data) {
            let levelupchanneldata = await LevelUpSchema.create({
                Guild: message.guild.id,
                Channel: channel.id
            })
            levelupchanneldata.save()
        } else {
            await LevelUpSchema.findOneAndUpdate({
                Guild: message.guild.id,
                Channel: channel.id
            })
        }
        
        message.channel.send(`Level up messages will now be sent in ${channel}`);

    },

};