const Commando = require("discord.js-commando");
const axios = require("axios");

class WallpaperCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "wallpaper",
      group: "simple",
      memberName: "wallpaper",
      description: "Links a random wallpaper from /r/wallpapers"
    });
  }

  async run(message, args) {
    axios
      .get("https://www.reddit.com/r/wallpapers/random.json")
      .then(function(response) {
        // handle success
        let num = Math.floor(Math.random() * 24) + 1;
        message.reply(response.data.data.children[num].data.url);

      })
      .catch(function(error) {
        // handle error
        message.reply("Oh no! something wen't wrong retrieving your wallpaper :(");
        console.log(error);
      });
  }
}

module.exports = WallpaperCommand;
