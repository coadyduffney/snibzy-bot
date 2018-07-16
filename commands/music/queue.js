const Commando = require("discord.js-commando");

class QueueCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "++queue",
      group: "music",
      memberName: "queue",
      description: "Display the current queue or and item from the queue."
    });
  }

  async run(message, args) {

  }
}

module.exports = QueueCommand;
