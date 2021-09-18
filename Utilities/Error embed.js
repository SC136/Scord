const Utility = require('./utility.json');

const Config = require('../Configurations/Config.json');

const Emoji = require('./emojis.json');

module.exports = function (Discord) {
    return new Discord.MessageEmbed()
        .setAuthor(Utility.name, Utility.avatar, Utility.url)
        .setFooter(`Error occured!  •  ©️ Scord`, 'https://i.imgur.com/4yMYyUj.png')
        .setColor(Config.color)
        .setTimestamp();
};