const Commando = require("discord.js-commando");

class PauseCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "++pause",
      group: "music",
      memberName: "pause",
      description: "Pause music playback."
    });
  }

  async run(message, args) {

  }
}

module.exports = PauseCommand;
