const Commando = require("discord.js-commando");
const Discord = require("discord.js");
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
    const class_icons = {
      death_knight:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/death-knight.png?raw=true",
      druid:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/druid.png?raw=true",
      shaman:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/shaman.png?raw=true",
      paladin:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/paladin.png?raw=true",
      rogue:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/rogue.png?raw=true",
      priest:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/priest.png?raw=true",
      mage:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/mage.png?raw=true",
      warrior:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/warrior.png?raw=true",
      warlock:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/warlock.png?raw=true",
      demon_hunter:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/demon-hunter.png?raw=true",
      monk:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/monk.png?raw=true",
      hunter:
        "https://github.com/coadyduffney/snibzy-bot/blob/master/img/class_icons/hunter.png?raw=true"
    };

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
              let data = response.data;
              // console.log(data);
              let author = `${data.name} - ${data.realm}`;
              let mythicPlus = {
                all: data.mythic_plus_scores.all,
                dps: data.mythic_plus_scores.dps,
                heals: data.mythic_plus_scores.healer,
                tank: data.mythic_plus_scores.tank,
              };

              let highestKey = '';
              let highestDungeon = '';

              if (data.mythic_plus_highest_level_runs[0]) {
                highestKey = data.mythic_plus_highest_level_runs[0].mythic_level;
                highestDungeon = data.mythic_plus_highest_level_runs[0].short_name
              }

              let raid_progression =
                data.raid_progression["antorus-the-burning-throne"].summary;
              let icon = "";

              if (data.class === "Death Knight") {
                icon = class_icons.death_knight;
              } else if (data.class === "Druid") {
                icon = class_icons.druid;
              } else if (data.class === "Shaman") {
                icon = class_icons.shaman;
              } else if (data.class === "Paladin") {
                icon = class_icons.paladin;
              } else if (data.class === "Rogue") {
                icon = class_icons.rogue;
              } else if (data.class === "Priest") {
                icon = class_icons.priest;
              } else if (data.class === "Mage") {
                icon = class_icons.mage;
              } else if (data.class === "Warrior") {
                icon = class_icons.warrior;
              } else if (data.class === "Warlock") {
                icon = class_icons.warlock;
              } else if (data.class === "Demon Hunter") {
                icon = class_icons.demon_hunter;
              } else if (data.class === "Monk") {
                icon = class_icons.monk;
              } else if (data.class === "Hunter") {
                icon = class_icons.hunter;
              }

              const embed2 = new Discord.RichEmbed()
                .setColor(13632027)
                .setTimestamp()
                .setFooter(
                  "Powered by Raider.io",
                  "http://scrubbusters.com/wp-content/uploads/2017/04/logowow.png"
                )
                .setThumbnail(data.thumbnail_url)
                .setAuthor(author, icon, data.profile_url)
                .addField(
                  `${data.active_spec_name} ${data.class}`,
                  `${data.gear.item_level_equipped} Equipped Item Level`
                )
                .addField(
                  "M+ Scores (Seasonal)",
                  `All: ${mythicPlus.all} **|** DPS: ${
                    mythicPlus.dps
                  } **|** Heals: ${mythicPlus.heals} **|** Tank: ${
                    mythicPlus.tank
                  }`
                )
                if (data.mythic_plus_highest_level_runs[0]) {
                  embed2.addField("Highest M+ (Seasonal)", `${highestKey} ${highestDungeon}`)
                } else {
                  embed2.addField("Highest M+ (Seasonal)", `0 Completed`)
                }
                embed2.addField("Antorus Progression", raid_progression)
                embed2.addField("2v2 Rating", rating_2v2.toString(), true)
                embed2.addField("3v3 Rating", rating_3v3.toString(), true)
                
              message.channel.send(embed2);
              
            })
            .catch(function(error) {
              message.reply(
                "Character not found. Make sure to type the command like this: `!wow name realm region`"
              );
              console.log(error);
            });
        })
        .catch(error => {
          message.reply("Error -> reason: " + error.data.reason);
          console.log(error);
        });
    }
  }
}

module.exports = WowCommand;
