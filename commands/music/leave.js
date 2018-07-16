const Commando = require("discord.js-commando");

class LeaveCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "++leave",
      group: "music",
      memberName: "leave",
      description: "Leaves the currently connected channel."
    });
  }

  async run(message, args) {

  }
}

module.exports = LeaveCommand;
