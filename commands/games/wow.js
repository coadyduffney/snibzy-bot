const Commando = require("discord.js-commando");
const axios = require("axios");


class WowCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "wow",
      group: "games",
      memberName: "wow",
      description: "Retrieves character info from Raider.io"
    });
  }

  // !wow snibzy zul'jin us
  async run(message, args) {
    let newArgs = args.split(" ");
    let charName = newArgs[0];
    let realm = newArgs[1];
    let region = newArgs[2] || 'us';
    let title = `${charName} - ${realm}`;

    if (!newArgs[0]) {
      message.reply('\nTo look up a player, use the following command: `!wow <player> <realm> <region>`\nregion defaults to US if none specified.');
    } else {
      axios
        .get(
          `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${charName}&fields=gear%2Craid_progression%2Cmythic_plus_scores%2Cmythic_plus_highest_level_runs`
        )
        .then(function (response) {
          // console.log(response.data);
          let data = response.data;
          let thumbnail = data.thumbnail_url;
          let profile_url = data.profile_url;
          let spec = data.active_spec_name;
          let gameClass = data.class;
          let itemLevel = data.gear.item_level_equipped;
          let author = `${data.name} - ${data.realm}`;
          let mythicPlus = {
            all: data.mythic_plus_scores.all,
            dps: data.mythic_plus_scores.dps,
            heals: data.mythic_plus_scores.healer,
            tank: data.mythic_plus_scores.tank,
            highestKey: data.mythic_plus_highest_level_runs[0].mythic_level,
            dungeonName: data.mythic_plus_highest_level_runs[0].short_name
          }
          let raid_progression = data.raid_progression['antorus-the-burning-throne'].summary;



          const embed = {
            "color": 13632027,
            "timestamp": "2018-07-10T12:03:39.868Z",
            "footer": {
              "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "thumbnail": {
              "url": thumbnail
            },
            "author": {
              "name": author,
              "url": profile_url,
              "icon_url": thumbnail
            },
            "fields": [{
                "name": `${spec} ${gameClass}`,
                "value": `${itemLevel} Equipped Item Level`
              },
              {
                "name": "M+ Score",
                "value": `**All**: ${mythicPlus.all} **|** **DPS**: ${mythicPlus.dps} **|** **Heals**: ${mythicPlus.heals} **|** Tank: ${mythicPlus.tank}`
              },
              {
                "name": "Highest M+",
                "value": `${mythicPlus.highestKey} ${mythicPlus.dungeonName}`
              },
              {
                "name": "Antorus Progression",
                "value": `**${raid_progression}**`
              }
            ]
          };
          message.channel.send({
            embed
          });

        })
        .catch(function (error) {
          message.reply(
            "Oh dear - that character must be lost in the nether! Make sure to type the command like this: `!wow name realm region`"
          );
          console.log(error.response.data.message);
        });
    }


  }
}

module.exports = WowCommand;