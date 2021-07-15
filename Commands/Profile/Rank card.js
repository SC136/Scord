const { MessageAttachment, MessageEmbed } = require('discord.js');

const Levels = require('discord-xp');

const canvacord = require('canvacord');

const { fetchLeaderboard } = require('discord-xp');

const Utility = require('../../Utilities/utility.json');

module.exports = {

    name: 'rankcard',
    aliases: ['rank-card', 'rnk-crd', 'rnkcrd'],
    description: 'Shows the current level and rank of the user!',

    async execute(client, message, args) {

        if (!message.guild) return;

        if (message.author.bot) return;

        const target = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member;

        if (target.user.bot && target.id !== '830000867205054484') return message.reply('Bruh, bots cannot earn XP!')

        if (target.id === '830000867205054484') return message.reply('Bruh, I also cannot earn XP! ||Cuz i have infinite XP!||')

        const user = await Levels.fetch(target.user.id, message.guild.id, true); // Selects the target from the database.

        if (!user) return message.channel.send("Seems Like This User Has Not Earned Any XP So Far."); // If there isnt such user in the database, we send a message in general.

        const neededXp = Levels.xpFor(parseInt(user.level) + 1)

        const Rank = new canvacord.Rank()

            .setAvatar(target.user.avatarURL({ format: "png", size: 1024 }))
            .setCurrentXP(user.xp)
            .setRank(parseInt(user.position), 'Rank -')
            .setLevel(user.level, 'Level -')
            .setRequiredXP(neededXp)
            .setStatus(target.user.presence.status, true)
            .setProgressBar('#FEE75C', "COLOR")
            .setUsername(target.user.username)
            .setDiscriminator(target.user.discriminator)
            .setBackground("COLOR", '#5865F2')
            .setOverlay('#7289da', 0.5, false)
        // .setLevelColor('#ED4245', '#EB459E')

        // target.displayAvatarURL({ dynamic: false, format: "jpg" , size : 2048})
        Rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "SC Bot RankCard.png");
                // message.channel.send(attachment);

                const Rankcardembed = new MessageEmbed()
                    .setAuthor(client.user.username, client.user.avatarURL({ type: 'png', size: 1024 }), Utility.url)
                    .setTitle('`Rankcard command`')
                    .attachFiles([new MessageAttachment(data, "Rankcard.png")])
                    .setImage("attachment://Rankcard.png")
                    .setFooter(`Requested by ${target.user.username} • ©️ Scord`)
                    .setColor(client.color)
                    .setTimestamp()

                message.channel.send(Rankcardembed);
            });
    },

};