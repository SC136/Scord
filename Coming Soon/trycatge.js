const { MessageEmbed } = require("discord.js");

const { readdirSync } = require("fs");

module.exports = {
  name: "categories",
  aliases: ['cate'],
  description: "See all my categories!",
  execute(client, message, args, f, prefix) {

    if (!args[0]) {

      let categories = [];

      readdirSync("./Commands/").forEach((dir) => {

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: 'bruh',
          inline: true
        };

        categories.push(data);

      });

        const embed = new MessageEmbed()
          .setTitle('Here are all my categories of commands')
          .setDescription(`\`\`\`Use '${prefix}categories' followed by a category name to get all the commands inside that category!\nFor example ▸ '${prefix}categories info'.\`\`\``)
          .addFields(categories)
          .setFooter(`Requested By ${message.author.username} | ©️ Scord`, client.user.avatarURL())
          .setColor(client.color)
          .setTimestamp()

        return message.channel.send(embed);

    } else {

      const commands = readdirSync(`./Commands/${args.join(' ')}/`).forEach((file) => {   
      });

      console.log(commands.map())

      const embed = new MessageEmbed()
      .setTitle(args.join(' '))

      message.channel.send(embed)
    }
  }
}