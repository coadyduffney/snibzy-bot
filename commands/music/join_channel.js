const Commando = require('discord.js-commando');
// https://github.com/nexu-dev/discord.js-music

class JoinChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Joins the voice channel of whoever enters the command.'
        });
    }

    async run(message, args) {
        if (message.member.voiceChannel) {
            if (!message.guild.voiceConnection) {
                message.member.voiceChannel.join()
                    .then(connenction => {
                        message.reply('Succesfully Joined Voice Channel!')
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } 
        } else {
            message.reply('You must be in a voice channel to summon me!');
        }
    }
}

module.exports = JoinChannelCommand;