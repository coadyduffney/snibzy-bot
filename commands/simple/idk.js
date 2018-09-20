const Commando = require('discord.js-commando');

class IdkCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'idk',
      group: 'simple',
      memberName: 'idk',
      description:
        'Links the "I dont know about that one chief" gif to the channel'
    });
  }

  async run(message, args) {
    message.channel.send(
      'https://thumbs.gfycat.com/FixedAllAmericanwarmblood-max-1mb.gif'
    );
  }
}

module.exports = IdkCommand;
