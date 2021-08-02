const { createCanvas, loadImage, registerFont } = require('canvas')
registerFont(process.cwd() + '/Fonts/uni-sans.heavy-caps.otf', { family: 'Sans Serif' });

const { getColorFromURL } = require('color-thief-node');

var rgb2hex = require('rgb2hex');

const Canvacord = require('canvacord');

const Levels = require('discord-xp');

module.exports = {

  name: 'profilecard',
  aliases: ['profcar', 'pc'],
  description: 'Shows your profile card',
  guildOnly: true,

  async execute(client, message, args, member) {

    const canvas = createCanvas(446, 610)
    const ctx = canvas.getContext('2d')
    const avatar = await loadImage(member.user.avatarURL({ format: 'png' }));
    const bodBadge = await loadImage('https://i.imgur.com/N9fx7VL.png');
    const scord = await loadImage('https://i.imgur.com/db3JF54.png');//https://i.imgur.com/aZ75ZOh.png
    const online = await loadImage('https://i.imgur.com/dxP6e0k.png');
    const idle = await loadImage('https://i.imgur.com/gc0WbXZ.png');
    const dnd = await loadImage('https://i.imgur.com/5vrJioO.png');
    const offline = await loadImage('https://i.imgur.com/XO0yhmX.png');

    let status;
    if (member.user.presence.status === 'online') {
      status = online;
    } else if (member.user.presence.status === 'idle') {
      status = idle;
    } else if (member.user.presence.status === 'dnd') {
      status = dnd;
    } else if (member.user.presence.status === 'offline') {
      status = offline;
    };

    let customstatus;
    //    if (member.user.presence.status === 'offline' || member.user.bot) {
    //      customstatus = 'None'
    //    } else {
    //      customstatus = member.user.presence.activities.find(a => a.type === 'CUSTOM_STATUS').state || 'None';
    //    };

    //let customstatus = member.user.presence.activities.find(a => a.type === 'CUSTOM_STATUS').state;
    //if (!customstatus) return customstatus = 'None';
    //if (member.user.presence.status === 'offline' || member.user.bot) {
    //  customstatus = 'None'
    //} else if (!customstatus) {
    //  customstatus = 'None';
    //};

    if (!member.user.presence.activities.length || member.user.bot) {
      customstatus = 'None';
    }

    member.user.presence.activities.forEach((activity) => {
      if (activity.type === "CUSTOM_STATUS") {
        customstatus = activity.state;
      } else if (activity.type === "PLAYING") {
        customstatus = activity.state;
      } else if (activity.type === "LISTENING" && activity.name === "Spotify" && activity.assets !== null) {
        customstatus = 'singing';
      }
    })

    const img = member.user.avatarURL({ format: 'png' });
    const result = await getColorFromURL(img);

    var hex = rgb2hex(`rgb(${result[0]},${result[1]},${result[2]})`);

    const shortenedcustomstatus = Canvacord.Util.shorten(customstatus, 30);

    const User = await Levels.fetch(member.user.id, message.guild.id, true);

    let Level;
    if (User) {
      Level = User.level;
    } else {
      Level = 'No level';
    };

    let Rank;
    if (User) {
      Rank = parseInt(User.position);
    } else {
      Rank = 'No rank';
    }

    let XP;
    if (User) {
      XP = Canvacord.Util.toAbbrev(User.xp);
    } else {
      XP = 'No XP';
    }

    // Canvas
    ctx.fillStyle = hex.hex;
    ctx.fillRect(0, 0, canvas.width, 100)

    ctx.fillStyle = '#18191c';
    ctx.fillRect(0, 100, canvas.width, 510)

    // add avatar
    ctx.beginPath();
    ctx.arc(100, 100, 60, 0, Math.PI * 2);
    ctx.lineWidth = 18;
    ctx.strokeStyle = '#18191c';
    ctx.stroke();
    ctx.closePath();
    ctx.save();
    ctx.clip();
    ctx.fillStyle = '#18191c';
    ctx.fillRect(40, 40, 120, 120);
    ctx.drawImage(avatar, 40, 40, 120, 120);
    ctx.restore();

    //add status
    ctx.beginPath();
    ctx.arc(140, 140, 12, 0, Math.PI * 2);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#18191c';
    ctx.stroke();
    ctx.closePath();
    ctx.save();
    ctx.clip();
    ctx.drawImage(status, 128, 128, 23, 23)
    ctx.restore();

    // add name
    ctx.beginPath()
    ctx.font = '33px Sans Serif'
    ctx.fillStyle = '#ffffff'
    //ctx.textAlign = 'center'
    ctx.fillText(`${member.displayName}#${member.user.discriminator}`, 38, 218, 400)

    // add status
    ctx.beginPath()
    ctx.font = '25px sans-serif'
    ctx.fillStyle = '#bcbdbf'
    ctx.fillText(shortenedcustomstatus, 38, 270, 444)
    //ctx.fillText('Custom status coming soon...', 38, 270, 444)

    ctx.fillStyle = '#242527';
    ctx.fillRect(0, 305, canvas.width, 1)

    ctx.font = '15px Sans Serif'
    ctx.fillStyle = '#949699'
    ctx.drawImage(scord, 350, 516, 80, 80)
    ctx.fillText('Profile command • ©️ Scord', 8, 600)

    // Level
    ctx.font = '25px Sans Serif'
    ctx.fillStyle = 'white'
    ctx.fillText('Level     ▸', 30, 350)
    ctx.fillStyle = '#7289da'
    ctx.fillText(Level, 180, 350)

    // Rank
    ctx.font = '25px Sans Serif'
    ctx.fillStyle = 'white'
    ctx.fillText('Rank     ▸', 30, 400)
    ctx.fillStyle = '#7289da'
    ctx.fillText(Rank, 180, 400)

    // XP
    ctx.font = '25px Sans Serif'
    ctx.fillStyle = 'white'
    ctx.fillText('XP          ▸', 30, 450)
    ctx.fillStyle = '#7289da'
    ctx.fillText(XP, 180, 450)

    // More
    ctx.font = '25 px Sans Serif'
    ctx.fillStyle = 'white'
    ctx.fillText('More      ▸', 30, 500)
    ctx.fillStyle = '#7289da'
    ctx.fillText('Coming soon!', 180, 500)

    message.channel.send({
      files: [{
        attachment: canvas.toBuffer(),
        name: 'Profilecard.png'
      }]
    });

  },
  
};