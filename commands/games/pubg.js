const Commando = require("discord.js-commando");
const key = "e868f0ab-31d9-4294-8e69-a78dabe958c1";
const axios = require("axios");
var http = require("https");

const config = {
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "Authorization": "30d90114b25f8a71ba288c6625eb4cc0"
  },
  body: {
    "language": "en"
  }
};

class PubgCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "pubg",
      group: "games",
      memberName: "pubg",
      description: "Retrieves player stats from PUBG Tracker (NOT WORKING :()"
    });
  }

  async run(message, args) {

    message.reply('This command is not working properly yet, please give me some time to fix it!');
    // let newArgs = args.split(" ");
    // let name = newArgs[0];
    // let platform = newArgs[1] || "pc";

    // axios
    //   .post(
    //     `https://fortnite-public-api.theapinetwork.com/prod09/store/get`,
    //     config
    //   )
    //   .then(function(response) {
    //     // handle success
    //     console.log(response);
    //     message.reply("success!");
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     console.log(error);
    //     message.reply("error");
    //   });
  }
}

module.exports = PubgCommand;
