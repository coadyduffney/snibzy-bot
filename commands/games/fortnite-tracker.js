const Commando = require("discord.js-commando");
const Client = require('fortnite');
const key = 'e92046d3-72e0-4824-8c52-d39e2af8c6a3';
const fortnite = new Client(key);
const axios = require('axios');
  


class FortniteCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "fortnite",
      group: "games",
      memberName: "fortnite",
      description: "Retrieves player stats from Fortnite Tracker (NOT WORKING :())"
    });
  }



  async run(message, args) {
    message.reply('This command is not working properly yet, please give me some time to fix it!');

    // let newArgs = args.split(' ');
    // let username = newArgs[0]
    // let platform = newArgs[1] || "pc";


    // axios
    //   .get(`https://api.pubgtracker.com/v2/profile/${platform}/${name}`, config)
    //   .then(function(response) {
    //     // handle success
    //     console.log(response);
    //     message.reply('success!');
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     console.log(error);
    //     message.reply('error');
    //   });






    // await message.delete();
    // let newArgs = args.split(' ');
    // let username = newArgs[0]
    // let platform = newArgs[1] || "pc";

    // if (!username) return message.reply('Please provide me with a username!');
    

    // let data = fortnite.user(username, platform)
    // .then(data => {
    //     console.log(data)
    //     let stats = data.stats;
    //     let lifetime = stats.lifetime;
    //     // console.log(lifetime);

    //     let score = lifetime[6]['Score'];
    //     let mPlayed = lifetime[7]['Matches Played'];
    //     let wins = lifetime[8]['Wins'];
    //     let winper = lifetime[9]['Win %'];
    //     let kills = lifetime[10]['Kills'];
    //     let kd = lifetime[11]['KD'];

    //     let embed = new Discord.RichEmbed()
    //     .setTitle('Fortnite Tracker Lifetime Stats')
    //     .setAuthor(data.username)
    //     .setColor("#eee")
    //     .addField('Wins', wins, true)
    //     .addField('Win %', winper, true)
    //     .addField('Kills', kills, true)
    //     .addField('K/D', kd, true)
    //     .addField('Score', score, true)
    //     .addField('Matches Played', mPlayed, true)

    //     message.channel.send(embed);
        
        
    // })
    // .catch(e => {
    //     console.log(e)
    // })
  }

}

module.exports = FortniteCommand;
