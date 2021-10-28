const imgur = require('imgur');

const clientId = '2ea8df3e0a40bb5';

imgur.setClientId(clientId);

const Badwords = require('bad-words');

const badWords = new Badwords();

module.exports = {

  name: `imgur`,
  aliases: [`img`],
  description: `Search for Images on Imgur`,
  usage: `<Query>`,
  args: true,

  execute(client, message, args) {

    if (badWords.isProfane(message.content)) return message.reply(client.error.send('No badwords allowed!'));

    const query = args.join(` `);

    imgur
      .search(query)
      .then((json) => {
        const ImageEmbed = new client.discord.MessageEmbed()
            .setAuthor(client.name, client.avatar, client.url)
            .setTitle('`Imgur Command`')
            .setThumbnail(`https://cdn.discordapp.com/attachments/779005181760765985/903267775127093308/300.png`)
            .setDescription(`\`\`\`${json[0].title}\`\`\``)
            .setImage(json[0].images[0].link)
            .setFooter(`Requested By ${message.author.username}  •  ©️ Scord`, message.author.avatarURL())
            .setColor(client.color)

        message.reply(ImageEmbed)
      })
      .catch((err) => {
        message.reply(client.error.send(`There were no results for your query`));
      });
  },

};