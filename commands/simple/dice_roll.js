const Commando = require('discord.js-commando');

class DiceRollCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'simple',
            memberName: 'roll',
            description: 'Rolls a random number between 1-100'
        });
    }

    async run(message, args) {
        let diceRoll = Math.floor(Math.random() * 100) + 1;
        message.channel.send(`${message.author} rolled ${diceRoll}! (1-100)`);
    }
}

module.exports = DiceRollCommand;