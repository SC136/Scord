const { MessageEmbed } = require("discord.js");

const { readdirSync } = require("fs");

const emoji = require('../../Utilities/emojis.json');

const Utility = require('../../Utilities/utility.json');

module.exports = {

  name: 'commands',
  aliases: ['cmd'],
  description: 'Shows all bot commands',
  usage: '• !cmd <Command name>',

  execute(client, message, args, member, prefix) {

    if (!args[0]) {

      let categories = [];

      const Emojis = {

        Fun: "<:DiscordFun:871669508690022460>",
        Info: "<:DiscordInfo:870511644709650472>",
        Moderation: "<:DiscordCertifiedModerator:870285100477214741>",
        Owner: "<:DiscordOwner:870516633226080306>",
        Profile: "<:DiscordPencil:870512370093551666>",
        Search: "<:DiscordSearch:903263592810446919>",
        Utility: "<:DiscordSettings:870510077134651402>"

      };

      readdirSync("./Commands/").forEach((dir) => {
        const commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {

          let file = require(`../../Commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `• ${name}`;
        });

        let data = new Object();

        const EmoDirName = `${Emojis[dir]}・${dir}`;

        data = {
          name: EmoDirName,
          value: `\`\`\`${cmds.length === 0 ? "In progress" : cmds.join("\n")}\`\`\``,
          inline: true
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setAuthor(client.name, client.avatar, client.url)
        .setTitle('`Here are all my commands`')
        .addFields(categories)
        .setDescription(`\`\`\`Use '${prefix}cmd' followed by a command name to get additional information on a command!\nFor example ▸ '${prefix}cmd ping' *you can also use aliases!\`\`\``)
        .setFooter(`Requested By ${message.author.username}  •  ©️ Scord`, message.author.avatarURL({ format: 'png', size: 1024, dynamic: true }))
        .setColor(client.color)
        .setTimestamp();

      return message.channel.send(embed);

    } else {

      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`${emoji.cross} Invalid command! Use \`${prefix}commands\` for all of my commands!`)
          .setColor(client.color);
        return message.channel.send(embed);
      }

      const Name = command.name ? `${command.name}` : "No name for this command";

      const CmdCap = Name.charAt(0).toUpperCase() + Name.slice(1);

      const embed = new MessageEmbed()

        .setTitle(`\`${CmdCap} command details\``)
        .addField(
          "Command ▸",
          command.name ? `\`\`\`${command.name}\`\`\`` : "No name for this command.",
        )
        .addField(
          "Description ▸",
          command.description
            ? `\`\`\`${command.description}\`\`\``
            : '```Description not available```'
        )
        .addField(
          "Aliases ▸",
          command.aliases
            ? `\`\`\`${command.aliases.join(" • ")}\`\`\``
            : '```Aliases not available```'
        )
        .addField(
          "Usage ▸",
          command.usage
            ? `\`\`\`${prefix}${command.name} ${command.usage}\`\`\``
            : `\`\`\`${prefix}${command.name}\`\`\``
        )
        .setFooter(
          `Requested by ${message.author.tag}  •  ©️ Scord`,
          message.author.avatarURL({ format: 'png', size: 1024, dynamic: true })
        )
        .setColor(client.color);

      return message.channel.send(embed);

    }
  },
};