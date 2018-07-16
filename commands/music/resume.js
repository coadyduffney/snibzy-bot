const Commando = require("discord.js-commando");

class ResumeCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "++resume",
      group: "music",
      memberName: "resume",
      description: "Resume music playback."
    });
  }

  async run(message, args) {

  }
}

module.exports = ResumeCommand;
