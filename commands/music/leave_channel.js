const Commando = require('discord.js-commando');
// https://github.com/nexu-dev/discord.js-music

class LeaveChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'Leaves the voice channel.'
        });
    }

    // Need to add ffmpeg to $PATH on home PC to leave voice channel.
    async run(message, args) {
        if (message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
            message.channel.send('Goodbye friends. :wave:')
        } else {
            message.reply('I must be in a voice channel before you can banish me!');
        }
    }
}

module.exports = LeaveChannelCommand;