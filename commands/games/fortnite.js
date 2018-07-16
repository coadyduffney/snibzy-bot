const Commando = require("discord.js-commando");
const key = '30d90114b25f8a71ba288c6625eb4cc0';
const axios = require('axios');
const config = {
  headers: {
    "Authorization": key
  }
};

class FortniteCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "fortnite",
      group: "games",
      memberName: "fortnite",
      description: "Retrieves player stats from Fortnite Tracker."
    });
  }



  async run(message, args) {
    const newArgs = args.split(' ');
    const player = newArgs[0]
    const platform = newArgs[1] || "pc";
    let uid = '';
    const id_url = 'https://fortnite-public-api.theapinetwork.com/prod09/users/id';
    const stats_url = 'https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats';
    let username = `username=${player}`;

    message.reply(`Retrieving stats for ${player}...`)

    // Retrieve player ID
    axios
      .post(id_url, username, config)
      .then(function(response) {
        const data = response.data;
        uid = data.uid;

        // Put together a string of params to pass
        const params = `user_id=${uid}&platform=${platform}`

        // Retrieve player stats using ID
        axios
          .post(stats_url, params, config)
          .then(function(response) {
            let stats = response.data;
            // console.log(stats.totals);

            const embed = {
              "title": "Total Stats - Alltime",
              "color": 12390624,
              "thumbnail": {
                "url": "https://i.ebayimg.com/images/g/6ekAAOSw3WxaO8mr/s-l300.jpg"
              },
              "author": {
                "name": player,
                "url": `https://fortnitetracker.com/profile/${platform}/${player}`,
                "icon_url": "https://i.ebayimg.com/images/g/6ekAAOSw3WxaO8mr/s-l300.jpg"
              },
              "fields": [
                {
                  "name": "Kills",
                  "value": stats.totals.kills.toString(),
                  "inline": true
                },
                {
                  "name": "K/D",
                  "value": stats.totals.kd.toString(),
                  "inline": true
                },
                {
                  "name": "Wins",
                  "value": stats.totals.wins.toString(),
                  "inline": true
                },

                {
                  "name": "Winrate",
                  "value": stats.totals.winrate.toString(),
                  "inline": true
                },
                {
                  "name": "Score",
                  "value": stats.totals.score.toString(),
                  "inline": true
                },
                      {
                  "name": "Matches Played",
                  "value": stats.totals.matchesplayed.toString(),
                  "inline": true
                }
              ]
            };
            message.channel.send({
              embed
            });
          })
          .catch(function(error) {
            console.log(error);
            message.reply('Error retrieving player stats...');
        });

      })
      .catch(function(error) {
        console.log(error);
        message.reply('Error finding player...');
    });

    

  }

}

module.exports = FortniteCommand;
