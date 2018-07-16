const Commando = require("discord.js-commando");
const key = '5c403ed94c46222b30ac597a40e896cc';
const axios = require('axios');
const config = {
  headers: {
    "Authorization": key
  }
};

class FortniteCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "test",
      group: "games",
      memberName: "test",
      description: "Retrieves player stats from Fortnite Tracker."
    });
  }



  async run(message, args) {
    message.reply('This command is not working properly yet, please give me some time to fix it!');

    let newArgs = args.split(' ');
    let username = newArgs[0]
    let platform = newArgs[1] || "pc";


    axios
      .post(`https://fortnite-public-api.theapinetwork.com/prod09/users/id`,{ firstName: 'Marlon' }, config)
      .then(function(response) {
        // handle success
        console.log(response);
        message.reply('success!');
      })
      .catch(function(error) {
        // handle error
        console.log(error);
        message.reply('error');
      });
  }

}

module.exports = FortniteCommand;
