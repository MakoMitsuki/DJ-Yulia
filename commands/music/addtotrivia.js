const { Command } = require('discord.js-commando');
const Youtube = require('simple-youtube-api');
const { youtubeAPI } = require('../../config.json');
const youtube = new Youtube(youtubeAPI);
const fs = require('fs');

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
          prompt: 'What is the link to the song you want to add?',
          type: 'string',
          validate: function(query) {
            return query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/);
          }
        },
        {
          key: 'nartist',
          prompt: 'Who is the artist to the song you want to add?',
          type: 'string',
        }, {
          key: 'nsongname',
          prompt: 'What is the name of the song you want to add?',
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
    
    console.log(link + nartist + nsongname);

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

    message.say("**" + nartist + " - " + nsongname + "** has been added to the Music Trivia Library! ");

  }

};