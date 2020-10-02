const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { youtubeAPI } = require('../../config.json');
const youtube = new Youtube(youtubeAPI);

module.exports = class AddToTriviaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'addtotrivia',
      aliases: ['add-to-trivia', 'add-song-to-trivia'],
      memberName: 'addtotrivia',
      group: 'music',
      description: "Contribute a song to the Music Trivia library!",
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
            return query.length > 0 && query.length < 200;
          }
        }
      ]
    });
  }

  async run(message) {
    // check if trivia is running
    if (message.guild.triviaData.isTriviaRunning == true) {
      message.say('Please try after the trivia has ended');
      return;
    }

    // fetch link array from txt file
    const jsonSongs = fs.readFileSync(
      'resources/music/musictrivia.json',
      'utf8'
    );
    var videoDataArray = JSON.parse(jsonSongs).songs;

    // check youtube url
    if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      query = query
        .replace(/(>|<)/gi, '')
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    }
    const id = query[2].split(/[^0-9a-z_\-]/i)[0];
      const video = await youtube.getVideoByID(id).catch(function() {
        message.say('There was a problem getting the video you provided!');
        return;
      });

      if (video.raw.snippet.liveBroadcastContent === 'live') {
        return message.say("Live streams are not allowed!");
      }
    }

};