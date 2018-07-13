const Commando = require("discord.js-commando");
const axios = require("axios");

class DadJokeCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "dadjoke",
      group: "simple",
      memberName: "dadjoke",
      description: "Tells a random dad joke!"
    });
  }

  async run(message, args) {
    const config = {
        headers: {
          "Accept": "application/json"
        }
    }
    axios
      .get("https://icanhazdadjoke.com/", config)
      .then(function(response) {
        let joke = response.data.joke;
        // console.log(joke);
        message.reply(joke + ' :laughing:');

      })
      .catch(function(error) {
        
        console.log(error);
      });
  }
}

module.exports = DadJokeCommand;
