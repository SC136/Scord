module.exports = {

	name: 'restart',
	aliases: ['reboot'],
	description: 'Restarts the bot',
	ownerOnly: true,

	execute(client, message) {

		message.channel
			.send('_Restarting..._')
			.then(message => client.destroy())
			.then(() => client.login(process.env.Scordtoken));

		message.channel.send('**Restarted!**');
	},
};