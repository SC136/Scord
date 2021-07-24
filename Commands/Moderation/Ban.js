module.exports = {

  name: 'ban',
  description: 'Bans a member',
  permissions: 'BAN_MEMBERS',
  args: true,
  usage: '<@Member> <Optional reason>',
  guildOnly: true,

  async execute(client, message, args) {

    const member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase());

    if (!member) {
      return message.reply(client.error.send('I was unable to find that member, make sure you have the proper id or proper ping\nFor more info ▸ \'!cmd ban\''))
    }

    if (member.id === message.author.id) {
      return message.reply(client.error.send('You cannot ban yourself!'));
    };

    if (member.id === client.user.id) {
      return message.reply(client.error.send('You cannot ban me through me! :('));
    };

    if (member.id === message.guild.ownerID) {
      return message.reply(client.error.send('You cannot ban the server owner!'))
    };

    if (member.id === client.owner) {
      return message.reply(client.error.send('You cannot ban my developer through me!'))
    };

    if (member.roles.highest.position >= message.member.roles.highest.position) {
      return message.reply(client.error.send('You cannot ban a member with a equal or higher role than yours!'))
    };

    if (!member.bannable) {
      return message.reply(client.error.send('I was unable ban that member...'))
    };

    let Reason = args.slice(1).join(' ');
    if (!Reason) {
      Reason = 'None';
    }

    await member.send(`**${message.author.tag}** banned you from ${message.guild.name}!\n**Reason** ▸ ${Reason || 'Unspecified.'}`)
      .catch(() => null);

    return member.ban({ reason: `Scord Ban Command • ${message.author.tag} Banned  ${member.user.tag} • Reason ▸ ${Reason}` })
      .then(_member => message.reply(client.embed.send(message, 'Ban command', `apache\n${_member.user.tag} was successfully banned!`, `Banned by ${message.author.tag}`)))
      .catch(() => message.reply(client.error.send('I was unable to ban that member...')));
  },

};