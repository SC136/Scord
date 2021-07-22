const Levels = require("discord-xp");

module.exports = {
	name: 'set-xp',
	ownerOnly: true,
	execute(client, message, args, member) {

		Levels.setXp('594504468931018752', '729294452765753435', 4899);

	},
};