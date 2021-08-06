const Discord = require('discord.js');

const Fetch = require('node-fetch');

const API = 'https://meme-api.herokuapp.com/gimme';

module.exports = {

	name: 'meme',
	description: 'ePiC memes :)',

	async execute(Client, Message) {

		try {

			let Res = await Fetch(API);

			Res = await Res.json();

			const memeembed = new Discord.MessageEmbed()

				.setAuthor(Client.name, Client.avatar, Client.url)
				.setTitle('`Meme command`')
				.setDescription(`\`\`\`Here is a nice meme for you :)\`\`\`\n**[${Res.title}](${Res.postLink})**`)
				.setImage(Res.url)
				.setFooter(`Requested by ${Message.member.displayName}  •  ©️ Scord`, Message.author.avatarURL({ type: 'png', size: 1024, dynamic: true }))
				.setColor(Client.color)
				.setTimestamp();

			Message.channel.send(memeembed);

		} catch (err) {

			Message.reply(Client.error.send('There was an error, please try again later : ('));

		};

	},

};