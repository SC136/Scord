const Config = require('../Configurations/Config.json');

const Utility = require('../Utilities/utility.json');

function send(message, commandName, description, footer) {
    return {
        embed: {
            author: { name: Utility.name, url: Utility.url, iconURL: Utility.avatar },
            title: `\`${commandName}\``,
            description: `\`\`\`${description}\`\`\``,
            footer: { text: `${footer}  •  ©️ Scord`, iconURL: message.author.avatarURL({ format: 'png', size: 1024, dynamic: true }) },
            color: Config.color,
            timestamp: new Date()
        },
    }
};

module.exports = {
    send: send
};