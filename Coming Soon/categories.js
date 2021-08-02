const Discord = require("discord.js");

const fs = require("fs");

module.exports = {
  name: "categories",
  aliases: ['cate'],
  description: "See all my categories!",
  execute(client, message, args, f, prefix) {

    if (!args[0]) {

      let categories = [];

      const dirt = ("./Commands/");

      fs.readdir(dirt, (err, dir) => {
        if (err) {
          throw err;
        }

        dir.forEach(dir => {

          categories.push({
            name: `${dir.toUpperCase()}`,
            value: `\`\`\`${prefix}cate ${dir.toLowerCase()}\`\`\``,
            inline: true,
          });
        });

        const embed = new Discord.MessageEmbed()

          .setTitle('Here are all my categories of commands')
          .setDescription(`\`\`\`Use '${prefix}categories' followed by a category name to get all the commands inside that category!\nFor example ▸ '${prefix}categories info'.\`\`\``)
          .addFields(categories)
          .setFooter(`Requested By ${message.author.username} | ©️ Scord`, client.user.avatarURL())
          .setColor(client.color)
          .setTimestamp();

        return message.channel.send(embed);

      });

    } else {

      const commands = fs.readdirSync(`./Commands/${args.join(" ")}/`).filter((file) =>
        file.endsWith(".js")
      );

      if (!commands) return message.reply('bruh no!');

      let command = []

      commands.forEach(cmd => {

        let file = require(`../../Commands/${args.join(" ")}/${cmd}`);

        if (!file) {
          return message.channel.send(
            new Discord.MessageEmbed()
              .setTitle('`No category!`')
              .setDescription('I dont have such category!\nTry for any other')
              .setFooter(`Requested By ${message.author.username} | ©️ Scord`, client.user.avatarURL())
              .setColor(client.color)
          );
        };

        command.push({
          name: `**\`${file.name}\`**`,
          value: `\`\`\`${file.description || ("No description")}\`\`\``,
          inline: true
        })
      })

      const embed = new Discord.MessageEmbed()
        .setTitle(`${args.join(" ")} commands`)
        .addFields(command)
        .setFooter(`Requested By ${message.author.username} | ©️ Scord`, client.user.avatarURL())
        .setColor(client.color)

      message.channel.send(embed)
    }
  }
}