const Commando = require("discord.js-commando");

class ReminderCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "reminder",
      group: "simple",
      memberName: "reminder",
      description: "Sends a reminder to the user after certain amount of time(minutes)."
    });
  }

  async run(message, args) {
    let min = args;
    // Converts minutes -> milliseconds
    let sec = (min * 60) * 1000;

    if (!isNaN(args)) {
        message.reply(`Timer started - I will remind you in ${min} minute(s)!`);
        console.log(sec);
    
        setTimeout(function() { 
            message.reply('HEY YOU - TIMES UP!')
        }, sec);
    } else {
        message.reply('Please provide me with a number in minutes, like this - !reminder 15');
    }



  }
}

module.exports = ReminderCommand;
