const Topggautoposter = require('topgg-autoposter');

module.exports = function (client) {

	const Ap = Topggautoposter.AutoPoster(process.env.Scordtopggtoken, client);

	Ap.on('posted', () => {

		console.log('▸ Posted stats to top.gg');

	});
	
};