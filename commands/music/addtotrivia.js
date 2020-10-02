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
      description: "Contribute a song to the Music Trivia library!"
    });
  }

  async run(message) {
    /*// check if trivia is running
    if (message.guild.triviaData.isTriviaRunning == true) {
      message.say('Please try after the trivia has ended');
      return;
    }

    // fetch link array from txt file
    const jsonSongs = fs.readFileSync(
      'resources/music/musictrivia.json',
      'utf8'
    );
    var videoDataArray = JSON.parse(jsonSongs).songs;*/ return;


  }
};