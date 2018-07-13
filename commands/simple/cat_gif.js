const Commando = require("discord.js-commando");
const axios = require("axios");

class CatGifCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "catgif",
      group: "simple",
      memberName: "catgif",
      description: "Links a random cat gif from /r/CatGifs"
    });
  }

  async run(message, args) {
    axios
      .get("https://www.reddit.com/r/CatGifs/random.json")
      .then(function(response) {
        // handle success
        message.reply(response.data[0].data.children[0].data.url);
        console.log(response.data[0].data.children[0].data);

      })
      .catch(function(error) {
        // handle error
        message.reply("Oh no! something wen't wrong retrieving your cute cat gif :(");
        // console.log(error);
      });
  }
}

module.exports = CatGifCommand;
