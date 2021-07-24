const Config = require('../Configurations/Config.json');

const Utility = require('../Utilities/utility.json');

function send(error) {
    return {
        embed: {
            author: { name: Utility.name, url: Utility.url, iconURL: Utility.avatar },
            title: '`Error`',
            thumbnail: { url: Utility.error },
            description: `\`\`\`diff\n- ${error || 'There was a problem while executing the command...'}\`\`\``,
            footer: { text: `Error occured!  •  ©️ Scord`, iconURL: Utility.error },
            color: Config.color,
            timestamp: new Date()
        },
    }
};

module.exports = {
    send: send
};