require('dotenv').config();

const fs = require('fs');

const Discord = require('discord.js');

const { prefix, color, owner, logchannelid } = require('./Configurations/Config.json');

const Utility = require('./Utilities/utility.json');

const emoji = require('./Utilities/emojis.json');

const client = new Discord.Client();

client.commands = new Discord.Collection();

client.cooldowns = new Discord.Collection();

client.manager = require('./Music/Manager')(client);

client.embed = require('./Utilities/Embed');

client.error = require('./Utilities/Error');

client.color = color;

client.avatar = 'https://i.imgur.com/aZ75ZOh.png';

client.name = Utility.name;

client.url = Utility.url;

client.owner = owner;

const MainError = require('./Utilities/Error embed')(Discord);

client.discord = Discord;

const mongo = require('./Utilities/mongo');
mongo.init();

const commandFolders = fs.readdirSync('./Commands');

for (const folder of commandFolders) {

	const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {

		const command = require(`./Commands/${folder}/${file}`);

		client.commands.set(command.name, command);
	}
}

const eventFiles = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {

	const event = require(`./Events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.on('message', message => {

	const args = message.content.slice(prefix.length).trim().split(/ +/);

	let member;

	if (message.channel.type === 'dm') {
		member = message.author;
	} else {
		member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member;
	};

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply(
			new Discord.MessageEmbed()
				.setTitle('`This is a server only command!`')
				.setDescription('```I can\'t execute that command inside DMs!```')
				.setFooter('©️ Scord', client.user.avatarURL())
				.setColor(client.color)
				.setTimestamp()
		);
	}

	if (command.ownerOnly && message.author.id !== owner) {
		return message.reply(
			new Discord.MessageEmbed()
				.setTitle('`This is a owner only command!`')
				.setDescription('```You cannot use that command!\nOnly my owner can!```')
				.setFooter('©️ Scord', client.user.avatarURL())
				.setColor(client.color)
				.setTimestamp()
		);
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply(client.error.send('You don\'t have the permission to use this command!'));
		}
	}

	if (command.args && !args.length) {

		let Reply = `\`\`\`diff\n- You didn't provide any arguments, ${message.author.username}!\`\`\``;

		if (command.usage) {
			Reply += `\n\`\`\`diff\n+ The proper usage would be ▸ ${prefix}${command.name} ${command.usage}\`\`\``;
		}

		return message.channel.send(message.author, MainError.setDescription(Reply));
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				new Discord.MessageEmbed()
					.setTitle('`Wait!`')
					.setDescription(`\`\`\`js\nPlease wait ${timeLeft.toFixed(1)} more second(s) before reusing the '${command.name}' command.\`\`\``)
					.setFooter('©️ Scord', client.user.avatarURL())
					.setColor(client.color)
					.setTimestamp()
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {

		command.execute(client, message, args, member, prefix);

	} catch (error) {

		console.error(error);
		message.reply(
			new Discord.MessageEmbed()
				.setTitle(`${emoji.cross} \`Error!\``)
				.setDescription('```bash\nThere was an error trying to execute that command!```')
				.setFooter('©️ Scord', client.user.avatarURL())
				.setColor(client.color)
				.setTimestamp()
		);
		const logchannel = client.channels.cache.get(logchannelid);
		logchannel.send(

			new Discord.MessageEmbed()
				.setTitle(`${emoji.cross} \`Error occured!\``)
				.setDescription(`\`\`\`${error.stack}\`\`\``)
				.addField('Command name ▸', `\`\`\`${command.name}\`\`\``)
				.addField('Server name ▸', `\`\`\`${message.guild.name}\`\`\``)
				.addField('Author ▸', message.author)
				.setColor(client.color)
		);
	}
});

client.login(process.env.Scordtoken);