const Commando = require('discord.js-commando');

class OverloadCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'overload',
      group: 'simple',
      memberName: 'overload',
      description:
        "Sets a timer to remind player when they're overload is about to expire."
    });
  }

  async run(message, args) {
    message.reply(
      `Timer started - I will remind you when your overload is about to expire!`
    );

    setTimeout(function() {
      message.reply('Your overload potion is about to expire!');
    }, 288000);
  }
}

module.exports = OverloadCommand;
