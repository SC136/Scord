const ProfileSchema = require('../../Models/Profile');

module.exports = {

    name: 'set-bio',
    aliases: ['set-profile-bio', 's-bio'],
    description: 'Sets your profile bio! See your profile using ▸ !porfile',
    args: true,
    usage: '<your bio> Ex. !set-bio hello there this is my bio',
    guildOnly: true,

    async execute(client, message, args) {

        const bio = args.join(' ');

        let data;
        data = await ProfileSchema.findOne({
            User: message.author.id
        })

        if (!data) {
            let ProfileData = await ProfileSchema.create({
                User: message.author.id,
                Bio: bio
            })
            ProfileData.save()
        } else {
            await ProfileSchema.findOneAndUpdate({
                User: message.author.id,
                Bio: bio
            })
        }
        
        message.channel.send(client.embed.send(message, 'Set bio', `Your bio successfully set to ▸ \n ${bio}`));

    },

};