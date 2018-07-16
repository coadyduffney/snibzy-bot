const Commando = require("discord.js-commando");

class JoinCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "++join",
      group: "music",
      memberName: "join",
      description: "Joins your currently connected channel."
    });
  }

  async run(message, args) {

  }
}

module.exports = JoinCommand;
