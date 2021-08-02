const Discord = require('discord.js');

//const Convert = require('parse-ms');

const Utility = require('../../Utilities/utility.json')

const Canvacord = require('canvacord');

module.exports = {

  name: 'spotify',
  aliases: ['spot'],
  description: 'Shows the song playing on spotify... • Spotify account must be connected to your discord account*',
  usage: '• !spotify <Member>',
  guildOnly: true,

  execute(client, message, args, member) {

    const user = member.user;

    let status;
    if (user.presence.activities.length === 1) status = user.presence.activities[0];
    else if (user.presence.activities.length > 1) status = user.presence.activities[1];

    if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {

      return message.reply(client.error.send('User is not listening to spotify!'));

    }


    if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
      let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
        url = `https://open.spotify.com/track/${status.syncID}`,
        name = status.details,
        artist = status.state,
        album = status.assets.largeText,
        timeStart = status.timestamps.start,
        timeEnd = status.timestamps.end;
      //timeConvert = Convert(timeEnd - timeStart);

      //let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
      //let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
      //let time = `${minutes}:${seconds}`;

      const card = new Canvacord.Spotify()
      
        .setAuthor(artist)
        .setAlbum(album)
        .setStartTimestamp(status.timestamps.start)
        .setEndTimestamp(status.timestamps.end)
        .setImage(image)
        .setTitle(name);

      card.build()
        .then(buffer => {
          Canvacord.write(buffer, "spotify.png");

          const Spotifyembed = new Discord.MessageEmbed()

            .setAuthor(client.user.username, client.user.avatarURL({ type: 'png', size: 1024 }), Utility.url)
            .setTitle('<:SpotifyIcon:844609218627764234> `Spotify command`')
            .setThumbnail(image)
            .setDescription('```Here is some info about the song you/someone is listening!```')
            .addField('Song name ▸', `\`\`\`${name}\`\`\``)
            .addField('Song album ▸', `\`\`\`${album}\`\`\``, true)
            .addField('Song\'s artist ▸', `\`\`\`${artist}\`\`\``, true)
            //.addField('Song duration ▸', time)
            .addField("Listen now on Spotify!", `[${artist} - ${name}](${url} "Click here to listen this song on spotify!")`)
            .attachFiles([new Discord.MessageAttachment(buffer, "spotify.png")])
            .setImage("attachment://spotify.png")
            .setFooter(`Listen along with ${user.tag}! • ©️ Scord`, user.avatarURL({ type: 'png', size: 1024, dynamic: true }))
            .setColor(client.color)
            .setTimestamp()

          message.channel.send(Spotifyembed);

        })

    }

  },

};