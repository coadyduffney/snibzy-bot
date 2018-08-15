const Commando = require("discord.js-commando");

class WallpaperCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "test",
      group: "simple",
      memberName: "test",
      description: "Sends a test message"
    });
  }

  async run(message, args) {
    message.reply('I am online and working!');
  }
  
}

module.exports = WallpaperCommand;
