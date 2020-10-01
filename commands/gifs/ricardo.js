const fetch = require("node-fetch");
const { tenorAPI } = require("../config.json");
const fs = require('fs');
const { Command } = require('discord.js-commando');

module.exports = class RicardoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ricardo',
      group: 'gifs',
      aliases: ['ricardo-gif', 'ricardo-gifs'],
      memberName: 'ricardo',
      description: 'Returns a random Ricardo Milos gif!',
      throttling: {
        usages: 1,
        duration: 4
      }
    });
  }

  run(message, { text }) {
    fetch(`https://api.tenor.com/v1/random?key=${tenorAPI}&q=ricardo%20milos&limit=1`)
      .then(res => res.json())
      .then(json => message.say(json.results[0].url))
      .catch(e => {
        message.say('Failed to find a Ricardo Gif');
        // console.error(e);
        return;
      });
  }
};
