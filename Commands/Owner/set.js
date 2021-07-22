const LevelUpSchema = require('../../Models/LevelUp');

module.exports = {
    name: 'set',
    description: 'Sets Level Up Channel',
    ownerOnly: true,

    async execute(clent, message, args) {

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply(`Which Channel Do You Want To Set The Level Up Message To Be Send?\n**Usage:-** \`!set level #ChannelName\``)

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
        message.channel.send(`Level Up Message Channel Set To ${channel}`)
    }
}