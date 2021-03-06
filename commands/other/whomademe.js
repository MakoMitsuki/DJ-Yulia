const { Command } = require('discord.js-commando');

module.exports = class WhoMadeMeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'whomademe',
      aliases: ['bot-maker', 'bot-creator'],
      memberName: 'whomademe',
      group: 'other',
      description: "Replies with the bot creator's name"
    });
  }

  run(message) {
    message.channel.send({embed: {
      color: 3447003,
      title: "DJ Yulia",
      url: "https://github.com/MakoMitsuki/DJ-Yulia",
      description: "Made by **Mika C** (@michanpyon#0610)"
    }});
  }
};
