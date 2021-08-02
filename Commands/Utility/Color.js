const Discord = require('discord.js');

const Canvas = require('canvas');

module.exports = {

	name: 'color',
	aliases: ['clr'],
	description: 'Shows a random color or the give color',
	usage: '• !color <Hex color>',

	async execute(client, message, [hex = '']) {

		var Color = hex.match(/[0-9a-f]{6}/) || Math.floor(Math.random() * 16777215).toString(16);

		let Hexcolor = `#${Color}`;

		const Colorcanvas = Canvas.createCanvas(100, 100);

		const ctx = Colorcanvas.getContext("2d");

		ctx.beginPath();
		ctx.rect(0, 0, 100, 100);
		ctx.fillStyle = Hexcolor;
		ctx.fill();

		const Colorimage = new Discord.MessageAttachment(Colorcanvas.toBuffer(), "Colorimage.png");

		const Colorembed = new Discord.MessageEmbed()

			.setTitle('`Color command`')
			.setDescription(`\`\`\`bash\nHex ▸ ${Hexcolor}\`\`\``)
			.attachFiles(Colorimage)
			.setImage('attachment://Colorimage.png')
			.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
			.setColor(client.color);

		message.reply(Colorembed);

	},

};