module.exports = {

  name: 'kick',
  description: 'Kicks a member',
  permissions: 'KICK_MEMBERS',
  args: true,
  usage: '<@Member> <Optional reason>',
  guildOnly: true,

  async execute(client, message, args) {

    const member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase());

    if (!member) {
      return message.reply(client.error.send('I was unable to find that member, make sure you have the proper id or proper ping\nFor more info ▸ \'!cmd kick\''))
    }

    if (member.id === message.author.id) {
      return message.reply(client.error.send('You cannot kick yourself!'));
    };

    if (member.id === client.user.id) {
      return message.reply(client.error.send('You cannot kick me through me! :('));
    };

    if (member.id === message.guild.ownerID) {
      return message.reply(client.error.send('You cannot kick the server owner!'))
    };

    if (member.id === client.owner) {
      return message.reply(client.error.send('You cannot kick my developer through me!'))
    };

    if (member.roles.highest.position >= message.member.roles.highest.position) {
      return message.reply(client.error.send('You cannot kick a member with a equal or higher role than yours!'))
    };

    if (!member.kickable) {
      return message.reply(client.error.send('I was unable kick that member...'))
    };

    let Reason = args.slice(1).join(' ');
    if (!Reason) {
      Reason = 'None';
    }
    if (Reason.length > 1024) Reason = Reason.slice(0, 1021) + '...';

    await member.send(`**${message.author.tag}** kicked you from ${message.guild.name}!\n**Reason**: ${Reason}`)
      .catch(() => null);

    return member.kick(`Scord Kick Command • ${message.author.tag} Kicked  ${member.user.tag} • Reason ▸ ${Reason}`)
      .then(_member => message.reply(client.embed.send(message, 'Kick command', `apache\n${_member.user.tag} was successfully kicked!`, `Kicked by ${message.author.tag}`)))
      .catch(() => message.reply(client.error.send('I was unable to kick that member...')));

  },

};