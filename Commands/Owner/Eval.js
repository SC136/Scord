const { MessageEmbed } = require('discord.js');

const Kitsu = require('search-kitsu');

const API = new Kitsu();

module.exports = {

  name: 'eval',
  usage: '<Code to evaluate>',
  description: 'Evaluates the provided code',
  ownerOnly: true,

  execute(client, message, args, member) {

    const input = args.join(' ');

    if (!input) return message.reply(client.error.send('Please provide code to eval'));

    if (!input.toLowerCase().includes('token')) {

      const embed = new MessageEmbed();

      try {
        let output = eval(input);
        if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });

        embed
          .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
          .addField('Output', `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``)
          .setColor(client.color);

      } catch (err) {
        embed
          .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
          .addField('Output', `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``)
          .setColor(client.color);
      }

      message.channel.send(embed);

    } else {
      message.channel.send('Bruhhh');
    }
  }
};