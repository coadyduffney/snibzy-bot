const Commando = require('discord.js-commando');

class SimCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'simyoself',
      group: 'simple',
      memberName: 'simyosel',
      description: 'Links the simyoself gif to the channel'
    });
  }

  async run(message, args) {
    message.channel.send('http://i.imgur.com/DdMAVrY.gif');
  }
}

module.exports = SimCommand;
