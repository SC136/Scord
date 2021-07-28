module.exports = {

	name: 'purge',
	aliases: ['clear', 'c', 'delete-messages', 'bulk-delete'],
	description: 'Bulk deletes given messages that are newer than two weeks',
	permissions: 'MANAGE_MESSAGES',
	args: true,
	usage: '<Amount of messages>',
	guildOnly: true,

	async execute(client, message, args) {

		let Amount = parseInt(args[0])

		if (isNaN(Amount)) {

			return message.reply(client.error.send('The amount of message to delete must be a number!'));

		};

		if (Amount < 1 || Amount > 100) {

			return message.reply(client.error.send('The amount of messages to delete must be between 1-100!'));

		};

		await message.channel.bulkDelete(Amount)
		.catch(() => message.reply(client.error.send('I was unable to delete the messages!')));

		let amount;

		if (Amount > 1) {

			amount = `${Amount} messages`

		} else {

			amount = `${Amount} message`
			
		};

		message.channel.send(client.embed.send(message, 'Purge', `Successfully deleted ${amount}!`))
		.then(m => m.delete({ timeout : 5000 }));

	},

};