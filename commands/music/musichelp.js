const Commando = require("discord.js-commando");

class MusicHelpCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "++musichelp",
      group: "music",
      memberName: "musichelp",
      description: "Displays help text for commands by this addon, or help for a specific command."
    });
  }

  async run(message, args) {

  }
}

module.exports = MusicHelpCommand;
