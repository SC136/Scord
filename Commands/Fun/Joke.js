const Discord = require('discord.js');

const Fetch = require('node-fetch');

const Utility = require('../../Utilities/utility')

module.exports = {

	name: 'joke',
	aliases: ['jk'],
	description: 'A nice joke is waiting for you...',

	async execute(client, message) {

		const data = await Fetch('https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist')
			.then(Res => Res.json())
			.catch(() => null);

		if (!data) return message.reply(client.error.send('Sorry, it seems something is not right. Try again later :('))

		const text = '```Here is a nice joke for you :)```';

		const jokeembed = new Discord.MessageEmbed()

			.setAuthor(client.user.username, client.user.avatarURL({ type: 'png', size: 1024 }), Utility.url)
			.setTitle('`Joke command`')
			.setDescription(data.type === 'twopart' ? `${text}\n\`\`\`${data.setup}\`\`\`\n||**${data.delivery}**||` : `${text}\n\`\`\`${data.joke}\`\`\``)
			.setFooter(`Requested by ${message.author.username}  •  ©️ Scord`, message.author.avatarURL())
			.setColor(client.color)
			.setTimestamp()

		message.channel.send(jokeembed)

	},

};