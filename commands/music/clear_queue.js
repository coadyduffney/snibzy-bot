const Commando = require("discord.js-commando");

class ClearQueueCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "++clearqueue",
      group: "music",
      memberName: "clearqueue",
      description: "Clears the song queue."
    });
  }

  async run(message, args) {

  }
}

module.exports = ClearQueueCommand;
