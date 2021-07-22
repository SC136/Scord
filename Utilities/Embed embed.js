const Utility = require('./utility.json');

const Config = require('../Configurations/Config.json');

module.exports = function (Discord) {
    return new Discord.MessageEmbed()
        .setAuthor(Utility.name, Utility.avatar, Utility.url)
        .setTitle('`command`')
        .setFooter(`Requested by  •  ©️ Scord`)
        .setColor(Config.color)
        .setTimestamp();
};