const Kitsu = require('search-kitsu');

const API = new Kitsu();

module.exports = {

    name: `anime`,
    aliases: [`ani`],
    description: `Search for anime`,
    usage: `<Query>`,
    args: true,

    async execute(client, message, args) {

        try {

        const Query = args.join(` `);

        const Results = await API.searchAnime(Query);

        const Anime = Results[0];

        const AnimeEmbed = new client.discord.MessageEmbed()
            .setAuthor(client.name, client.avatar, client.url)
            .setTitle('`Anime Command`')
            .setThumbnail(Anime.posterImage ? Anime.posterImage.original : `https://cdn.discordapp.com/attachments/869211547564654622/888425866625957968/unknown.png`)
            .setDescription(`\`\`\`${Anime.titles.en} • ${Anime.titles.ja_jp}\`\`\`\`\`\`${Anime.synopsis}\`\`\``)
            .addField(`Average Rating ▸`, `\`\`\`${Anime.avgRating}\`\`\``, true)
            .addField(`Type ▸`, `\`\`\`${Anime.showType}\`\`\``, true)
            .addField(`Status ▸`, `\`\`\`${Anime.status}\`\`\``, true)
            .addField(`Episode Count ▸`, `\`\`\`${Anime.epCount}\`\`\``, true)
            .addField(`NSFW ▸`, `\`\`\`${Anime.nsfw}\`\`\``, true)
            .setImage(Anime.coverImage ? Anime.coverImage.original : `https://cdn.discordapp.com/attachments/869211547564654622/888425866625957968/unknown.png`)
            .setColor(client.color)

            await message.reply(AnimeEmbed);

        } catch {

            message.reply(client.error.send(`There were no results for your query`));
            
        };

    },
};