const { Command } = require('discord.js-commando');
const fs = require('fs');
const Discord = require('discord.js');

module.exports = class AddToTriviaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'addtotrivia',
      aliases: ['add-to-trivia', 'add-song-to-trivia'],
      memberName: 'addtotrivia',
      group: 'music',
      description: "Contribute a song to the Music Trivia library! Type ``?addtotrivia <youtubelink>``",
      throttling: {
        usages: 2,
        duration: 5
      },
      args: [
        {
          key: 'link',
          prompt: '**What is the __LINK__ to the song you want to add?**',
          type: 'string',
          validate: function(query) {
            return query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/);
          }
        },
        {
          key: 'nartist',
          prompt: '**Who is the __ARTIST__ to the song you want to add?**',
          type: 'string',
        }, {
          key: 'nsongname',
          prompt: '**What is the __NAME__ of the song you want to add?**',
          type: 'string',
        }
      ]
    });
  }

  async run(message, { link, nartist, nsongname }) {
    // check if trivia is running
    if (message.guild.triviaData.isTriviaRunning == true) {
      message.say('Please try after the trivia has ended');
      return;
    }

    // error message if not a valid youtube link
    if (!link.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      message.say("The link you are trying to use may be an invalid link or not a YouTube link. Try again!");
      return;
    }
    
    // DEBUG: console.log(link + nartist + nsongname);

    // fetch array from txt file
    var jsonSongs = fs.readFileSync(
      'resources/music/musictrivia.json',
      'utf8'
    );
    var videoDataArray = JSON.parse(jsonSongs);


      videoDataArray.songs.push({
        url: link,
        singer: nartist,
        title: nsongname
      });
      jsonSongs = JSON.stringify(videoDataArray);
  
      var w = fs.writeFileSync('resources/music/musictrivia.json', jsonSongs);

      const videoEmbed = new Discord.MessageEmbed()
        .setThumbnail('https://cdn.iconscout.com/icon/free/png-256/music-859-459997.png')
        .setColor('#0099ff')
        .setTitle("Song added to Music Trivia!")
        .setDescription("**" + nartist + " - " + nsongname + "**")
        .setTimestamp();
      message.channel.send(videoEmbed);

  }

};