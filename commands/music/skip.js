const Commando = require("discord.js-commando");

class SkipCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "++skip",
      group: "music",
      memberName: "skip",
      description: "Skip a song or multi songs with skip [some number]."
    });
  }

  async run(message, args) {

  }
}

module.exports = SkipCommand;
