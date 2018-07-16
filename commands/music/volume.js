const Commando = require("discord.js-commando");

class VolumeCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "++volume",
      group: "music",
      memberName: "volume",
      description: "Adjust the playback volume between 1 and 200."
    });
  }

  async run(message, args) {

  }
}

module.exports = VolumeCommand;
