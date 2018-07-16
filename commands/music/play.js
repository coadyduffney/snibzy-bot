const Commando = require("discord.js-commando");

class JoinCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "++play <url>",
      group: "music",
      memberName: "play",
      description: "Play audio from YouTube."
    });
  }

  async run(message, args) {

  }
}

module.exports = JoinCommand;
