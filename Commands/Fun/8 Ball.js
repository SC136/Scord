const Discord = require('discord.js');

const Badwords = require('bad-words');

const badWords = new Badwords();

module.exports = {

  name: '8ball',
  aliases: ['8-ball', 'eightball', '🎱'],
  description: 'The 🎱ball will answer...',
  args: true,
  usage: '<Stuff to say>',

  execute(client, message, args) {

    const eightball = [
      'It is certain.'
      , 'It is decidedly so.'
      , 'Without a doubt.'
      , 'Yes - definitely.'
      , 'You may rely on it.'
      , 'As I see it, yes.'
      , 'Most likely.'
      , 'Outlook good.'
      , 'Yes.'
      , 'Signs point to yes.'
      , 'Reply hazy, try again.'
      , 'Ask again later.'
      , 'Better not tell you now.'
      , 'Cannot predict now.'
      , 'Concentrate and ask again.'
      , 'Don\'t count on it.'
      , 'My reply is no.'
      , 'My sources say no.'
      , 'Outlook not so good.'
      , 'Very doubtful.'
      , 'No bruh'
      , 'Why not?'
      , 'Ok, i guess'
      , 'Really?'
      , 'Wait!, what?!'
      , 'LOL'
      , 'IDK'
    ];

    if (badWords.isProfane(message.content)) return message.reply(client.error.send('No badwords allowed!'));

    const response = eightball[Math.floor(Math.random() * eightball.length)];

    const eightballembed = new Discord.MessageEmbed()

      .setAuthor(client.name, client.avatar, client.url)
      .setTitle('`8ball command`')
      .setDescription('```apache\nThe 8 Ball will answer you...```')
      .addField('Content ▸', `\`\`\`${args.join(' ')}\`\`\``)
      .addField('8 Ball\'s reply ▸', `\`\`\`${response}\`\`\``)
      .setFooter(`8 Ball requested by ${message.author.username}  •  ©️ Scord`, message.author.avatarURL({ format: 'png', size: 1024, dynamic: true }))
      .setColor(client.color)
      .setTimestamp()

    message.channel.send(eightballembed);

  },

}