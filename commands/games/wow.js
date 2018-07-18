const Commando = require("discord.js-commando");
const axios = require("axios");
const config = require("../../config");
const key = config.blizzardKey;
const blizzard = require("blizzard.js").initialize({ apikey: key }); // https://github.com/benweier/blizzard.js/blob/master/API.md

class WowCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "wow",
      group: "games",
      memberName: "wow",
      description:
        "Retrieves character raid progression, M+ scores, and arena ratings."
    });
  }

  // !wow snibzy zul'jin us
  async run(message, args) {
    let newArgs = args.split(" ");
    let charName = newArgs.shift(); // remove character name from the array
    let realm = newArgs.join(" "); // joins the array together to make up realm name
    let region = "us";
    let rating_2v2 = "";
    let rating_3v3 = "";
    let rating_RBG = "";

    if (!newArgs[0]) {
      message.reply(
        "\nTo look up a player, use the following command: `!wow <player> <realm>`"
      );
    } else {
      // Get characters arena ratings
      blizzard.wow
        .character(["pvp"], { realm: realm, name: charName, origin: region })
        .then(response => {
          rating_2v2 = response.data.pvp.brackets.ARENA_BRACKET_2v2.rating;
          rating_3v3 = response.data.pvp.brackets.ARENA_BRACKET_3v3.rating;
          rating_RBG = response.data.pvp.brackets.ARENA_BRACKET_RBG.rating;

          // Get characters info & raid/M+ progression
          axios
            .get(
              `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${charName}&fields=gear%2Craid_progression%2Cmythic_plus_scores%2Cmythic_plus_highest_level_runs%2Craid_achievement_curve`
            )
            .then(function(response) {
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
                tank: data.mythic_plus_scores.tank
                // highestKey: data.mythic_plus_highest_level_runs[0].mythic_level,
                // dungeonName: data.mythic_plus_highest_level_runs[0].short_name
              };
              let raid_progression =
                data.raid_progression["antorus-the-burning-throne"].summary;

              const embed = {
                color: 13632027,
                timestamp: new Date(),
                footer: {
                  icon_url:
                    "http://scrubbusters.com/wp-content/uploads/2017/04/logowow.png",
                  text: "World of Warcraft"
                },
                thumbnail: {
                  url: thumbnail
                },
                author: {
                  name: author,
                  url: profile_url,
                  icon_url: thumbnail
                },
                fields: [
                  {
                    name: `${spec} ${gameClass}`,
                    value: `${itemLevel} Equipped Item Level`
                  },
                  {
                    name: "M+ Score",
                    value: `All: ${mythicPlus.all} **|** DPS: ${
                      mythicPlus.dps
                    } **|** Heals: ${mythicPlus.heals} **|** Tank: ${
                      mythicPlus.tank
                    }`
                  },
                  // {
                  //   "name": "Highest M+",
                  //   "value": `${mythicPlus.highestKey} ${mythicPlus.dungeonName}`
                  // },
                  {
                    name: "Antorus Progression",
                    value: `${raid_progression}`
                  },
                  {
                    name: "2v2 Rating",
                    value: `${rating_2v2.toString()}`,
                    inline: true
                  },
                  {
                    name: "3v3 Rating",
                    value: `${rating_3v3.toString()}`,
                    inline: true
                  }
                ]
              };
              message.channel.send({
                embed
              });
            })
            .catch(function(error) {
              message.reply(
                "Character not found. Make sure to type the command like this: `!wow name realm region`"
              );
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}

module.exports = WowCommand;
