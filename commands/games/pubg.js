const Commando = require("discord.js-commando");
const key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhYjE4YTZiMC02NjdiLTAxMzYtODY3Ni0wZWI2MzFjZjMxMzUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTMxMjMzMDA3LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InNuaWJ6eS1ib3QifQ.8szp5UQF_GCjQ4l6wfuQXbKC5q2NAQ4wOVA2cxJtqXY";
const axios = require("axios");
const pubg = require('pubg.js'); // https://www.npmjs.com/package/pubg.js
const client = new pubg.Client(key, 'pc-na');

const config = {
  headers: {

  }
};

class PubgCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "pubg",
      group: "games",
      memberName: "pubg",
      description: "Retrieves player stats for PUBG"
    });
  }

  async run(message, args) {
    message.reply('Sorry, this feature is still in development. Try again later!');
    // Capitalize first letter function
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }

    let newArgs = args.split(" ");
    let player_name = newArgs[0];

    const pubg_logo = 'https://www.spreadshirt.com/image-server/v1/mp/designs/1014756538,width=178,height=178/pubg-logo.png';


    // Retrieve Player Stats
    const playerSeason = client.getPlayerSeason('Snibzy', 'division.bro.official.2018-07')
    .then(player => {
      // message.reply(`Retrieving data for ${player_name}...`)
      // console.log(player);

    })
    .catch(error => {
      console.log(error)
    })
  }
}

module.exports = PubgCommand;
