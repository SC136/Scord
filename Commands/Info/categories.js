const Fs = require("fs");

module.exports = {

  name: 'categories',
  aliases: ['cate'],
  description: "Shows all available bot commands",

  execute(client, message, args, $, prefix) {

    if (!args[0]) {

      let categories = [];

      let ignored = [];

      const emo = {

        Fun: "<:DiscordFun:871669508690022460>",
        Info: "<:DiscordInfo:870511644709650472>",
        Moderation: "<:DiscordCertifiedModerator:870285100477214741>",
        Owner: "<:DiscordOwner:870516633226080306>",
        Profile: "<:DiscordPencil:870512370093551666>",
        Utility: "<:DiscordSettings:870510077134651402>"

      };

      Fs.readdirSync("./Commands/").forEach((dir) => {

        if (ignored.includes(dir.toLowerCase())) return;

        const name = `${emo[dir]}・${dir}`;

        let cats = new Object();

        cats = {

          name: name,
          value: `\`\`\`${prefix}cate ${dir.toLowerCase()}\`\`\``,
          inline: true

        };

        categories.push(cats);

      });

      const embed = new client.discord.MessageEmbed()

          .setTitle('`Here are all my categories of commands`')
          .setDescription(`\`\`\`js\nUse '${prefix}cate' followed by a category name to get all the commands inside that category\n\nFor example ▸ '${prefix}cate info'\`\`\``)
          .addFields(categories)
          .setFooter(`Requested By ${message.author.username}  •  ©️ Scord`, message.author.avatarURL({ format: 'png', size: 1024, dynamic: true }))
          .setColor(client.color)
          .setTimestamp();

      return message.channel.send(embed);

    } else {

      let cots = [];

      let catts = [];

      Fs.readdirSync("./Commands/").forEach((dir) => {

        if (dir.toLowerCase() !== args[0].toLowerCase()) return;

        const commands = Fs.readdirSync(`./Commands/${dir}/`).filter((file) =>

          file.endsWith(".js")

        );

        const cmds = commands.map((command) => {

          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name";

          let name = file.name.replace(".js", "");

          let obj = {

            cname: name,
            cdes: file.description || 'No description'

          };

          return obj;

        });

        let dota = new Object();

        cmds.map((co) => {

          dota = {

            name: `**\`${co.cname}\`**`,
            value: `\`\`\`${co.cdes}\`\`\``,
            inline: true

          };

          catts.push(dota);

        });

        cots.push(dir.toLowerCase());

      });

      if (cots.includes(args[0].toLowerCase())) {

        const emoji = {

          Fun: "<:DiscordFun:871669508690022460>",
          Info: "<:DiscordInfo:870511644709650472>",
          Moderation: "<:DiscordCertifiedModerator:870285100477214741>",
          Owner: "<:DiscordOwner:870516633226080306>",
          Profile: "<:DiscordPencil:870512370093551666>",
          Utility: "<:DiscordSettings:870510077134651402>"

        };

        const DirCap = args[0].charAt(0).toUpperCase() + args[0].slice(1);

        const embed = new client.discord.MessageEmbed()

          .setTitle(`${emoji[DirCap]}・\`${DirCap} commands\``)
          .addFields(catts)
          .setFooter(`Requested by ${message.author.username}  •  ©️ Scord`, message.author.avatarURL({ format: 'png', size: 1024, dynamic: true }))
          .setColor(client.color)
          .setTimestamp();

        return message.channel.send(embed);

      };

    };

  },

};