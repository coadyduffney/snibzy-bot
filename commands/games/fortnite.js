const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const config = require("../../config");
const key = config.fortniteKey;
const axios = require("axios");
const axios_config = {
  headers: {
    Authorization: key
  }
};

class FortniteCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "fortnite",
      group: "games",
      memberName: "fortnite",
      description:
        "Retrieve player stats, and view daily shop items, specific items, and season challenges."
    });
  }

  async run(message, args) {
    const ps4_logo =
      "https://logodownload.org/wp-content/uploads/2017/05/playstation-4-logo-ps4-6.png";
    const xb1_logo =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2000px-Xbox_one_logo.svg.png";
    const pc_logo =
      "https://cdn4.iconfinder.com/data/icons/proglyphs-free/512/Windows-128.png";
    const fortnite_logo =
      "https://i.ebayimg.com/images/g/6ekAAOSw3WxaO8mr/s-l300.jpg";
    const challenge_logo =
      "https://fortnite-public-files.theapinetwork.com/fortnite-br-challenges-star.png";

    const newArgs = args.split(" ");

    // Capitalize function
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };

    if (!newArgs[0]) {
      message.reply(`
To look up a players stats, use: \`!fortnite stats <window> <player> <platform>\`
To look up challenges, use: \`!fortnite challenges <season> <week>\`
To look up current store items, use: \`!fortnite store\`
To look up a specific item, use: \`!fortnite item <item name>\``);
    } else {
      // Handle player stats command
      if (newArgs[0] === "stats") {
        if (!newArgs[1]) {
          message.reply(
            "\nPlease provide me with a name to lookup like this: `!fortnite stats alltime NICKMERCS ps4`\n**window** = season5 or alltime\n**platforms** = pc, xb1, ps4"
          );
        } else {
          const platform = newArgs.pop(); // removes platform string from array
          newArgs.shift(); // removes the 'stats' string from array
          const window = newArgs.shift(); // removes window from array
          const player = newArgs.join("%20"); // left with just an arrray of the players username, join together with %20 to send to POST request

          const id_url =
            "https://fortnite-public-api.theapinetwork.com/prod09/users/id";
          const stats_url =
            "https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats";
          let username = `username=${player}`;
          let newPlayer = player.replace("%20", " ");

          message.reply(`Retrieving stats for ${newPlayer.capitalize()}...`);

          // Retrieve player ID
          axios
            .post(id_url, username, axios_config)
            .then(function(response) {
              const data = response.data;
              let uid = data.uid;

              // Put together a string of params to pass
              const params = `user_id=${uid}&platform=${platform}&window=${window}`;

              // Retrieve player stats using ID
              axios
                .post(stats_url, params, axios_config)
                .then(function(response) {
                  let stats = response.data;
                  let icon_url = "";
                  let trn_platform = "";

                  // Change icon to matching platform, and update fortnitetracker.com URL
                  if (platform === "pc") {
                    icon_url = pc_logo;
                    trn_platform = "pc";
                  } else if (platform === "ps4") {
                    icon_url = ps4_logo;
                    trn_platform = "psn";
                  } else if (platform === "xb1") {
                    icon_url = xb1_logo;
                    trn_platform = "xbox";
                  } else {
                    icon_url = fortnite_logo;
                  }

                  const embed = {
                    title: `Total Stats - ${window.capitalize()}`,
                    color: 9374122,
                    timestamp: new Date(),
                    thumbnail: {
                      url: fortnite_logo
                    },
                    author: {
                      name: newPlayer.capitalize(),
                      url: `https://fortnitetracker.com/profile/${trn_platform}/${player}`,
                      icon_url: icon_url
                    },
                    fields: [
                      {
                        name: "Kills",
                        value: stats.totals.kills.toString(),
                        inline: true
                      },
                      {
                        name: "K/D",
                        value: stats.totals.kd.toString(),
                        inline: true
                      },
                      {
                        name: "Wins",
                        value: stats.totals.wins.toString(),
                        inline: true
                      },

                      {
                        name: "Winrate",
                        value: stats.totals.winrate.toString(),
                        inline: true
                      },
                      {
                        name: "Score",
                        value: stats.totals.score.toString(),
                        inline: true
                      },
                      {
                        name: "Matches Played",
                        value: stats.totals.matchesplayed.toString(),
                        inline: true
                      }
                    ]
                  };
                  message.channel.send({
                    embed
                  });
                })
                .catch(function(error) {
                  console.log(error);
                  message.reply("Error retrieving player stats");
                });
            })
            .catch(function(error) {
              console.log(error);
              message.reply("Error finding player");
            });
        }
        // Handle challenges command
      } else if (newArgs[0] === "challenges") {
        if (!newArgs[1]) {
          message.reply(
            "\nPlease provide me with a season & week to lookup like this: `!fortnite challenges season5 week1`"
          );
        } else {
          newArgs.shift(); // remove 'challenges' from args array
          const season = newArgs[0];
          const week = newArgs[1];
          const challenge_url =
            "https://fortnite-public-api.theapinetwork.com/prod09/challenges/get";
          const challenge_params = `season=${season}&language=en`;

          message.reply(`retrieving challenges for ${season} ${week}`);

          // Retrieve player stats using ID
          axios
            .post(challenge_url, challenge_params, axios_config)
            .then(function(response) {
              // console.log(response.data);
              const challenges = response.data.challenges[week];

              const embed = {
                title: `***${week.capitalize()}***`,
                color: 9374122,
                timestamp: new Date(),
                thumbnail: {
                  url: fortnite_logo
                },
                author: {
                  name: `${season.capitalize()} Challenges`,
                  url: "https://fortniteapi.com/challenges",
                  icon_url: challenge_logo
                },
                fields: [
                  {
                    name: challenges[0].challenge,
                    value: `0/${challenges[0].total} - ${
                      challenges[0].stars
                    } Stars`
                  },
                  {
                    name: challenges[1].challenge,
                    value: `0/${challenges[1].total} - ${
                      challenges[1].stars
                    } Stars`
                  },
                  {
                    name: challenges[2].challenge,
                    value: `0/${challenges[2].total} - ${
                      challenges[2].stars
                    } Stars`
                  },
                  {
                    name: challenges[3].challenge,
                    value: `0/${challenges[3].total} - ${
                      challenges[3].stars
                    } Stars`
                  },
                  {
                    name: challenges[4].challenge,
                    value: `0/${challenges[4].total} - ${
                      challenges[4].stars
                    } Stars`
                  },
                  {
                    name: challenges[5].challenge,
                    value: `0/${challenges[5].total} - ${
                      challenges[5].stars
                    } Stars`
                  },
                  {
                    name: challenges[6].challenge,
                    value: `0/${challenges[6].total} - ${
                      challenges[6].stars
                    } Stars`
                  }
                ]
              };
              message.channel.send({ embed });
            })
            .catch(function(error) {
              console.log(error);
              message.reply("Error retrieving challenges");
            });
        }

        // Handle Store command
      } else if (newArgs[0] === "store") {
        const store_url =
          "https://fortnite-public-api.theapinetwork.com/prod09/store/get";
        const store_params = "language=en";

        message.reply(`retrieving store items...`);

        axios
          .post(store_url, store_params, axios_config)
          .then(function(response) {
            const items = response.data.items;

            let featured_items = [];
            let daily_items = [];

            // Loop through items, seperating featured and daily items into their own arrays
            items.forEach(item => {
              if (item.featured === 1) {
                featured_items.push(item);
              } else {
                daily_items.push(item);
              }
            });

            // Create featured items embed
            const featured_embed = new Discord.RichEmbed()
              .setURL("https://fortniteapi.com/store")
              .setColor(9374122)
              .setTimestamp()
              .setAuthor(
                "Featured Items",
                "https://fortnite-public-files.theapinetwork.com/fortnite-vbucks-icon.png"
              )
              .setFooter(
                "Fortnite",
                "https://i.ebayimg.com/images/g/6ekAAOSw3WxaO8mr/s-l300.jpg"
              )
              .setThumbnail(
                "https://i.ebayimg.com/images/g/6ekAAOSw3WxaO8mr/s-l300.jpg"
              );
            // Loop through featured items, adding a field to the embed for each.
            featured_items.forEach(item => {
              featured_embed.addField(item.name, `${item.cost} V-Bucks`, true);
            });

            // Create daily items embed
            const daily_embed = new Discord.RichEmbed()
              .setURL("https://fortniteapi.com/store")
              .setColor(9374122)
              .setTimestamp()
              .setAuthor(
                "Daily Items",
                "https://fortnite-public-files.theapinetwork.com/fortnite-vbucks-icon.png"
              )
              .setFooter(
                "Fortnite",
                "https://i.ebayimg.com/images/g/6ekAAOSw3WxaO8mr/s-l300.jpg"
              )
              .setThumbnail(
                "https://i.ebayimg.com/images/g/6ekAAOSw3WxaO8mr/s-l300.jpg"
              );
            // Loop through daily items, adding a field to the embed for each.
            daily_items.forEach(item => {
              daily_embed.addField(item.name, `${item.cost} V-Bucks`, true);
            });

            // Send both embeds to the text channel
            message.channel.send(featured_embed).then(msg => {
              message.channel.send(daily_embed);
            });
          })
          .catch(function(error) {
            console.log(error);
            message.reply("Error retrieving store items");
          });

        // Handle item command
      } else if (newArgs[0] === "item") {
        if (!newArgs[1]) {
          message.reply(
            "\nPlease provide me with a name to lookup like this: `!fortnite item <item name>`"
          );
        } else {
          newArgs.shift(); //remove 'item' from array
          let item_name = newArgs.join(" ");
          const item = item_name.replace(" ", "%20");

          axios(
            `https://fortnite-public-files.theapinetwork.com/search?query=${item}`,
            axios_config
          )
            .then(response => {
              // console.log(response.data);
              const data = response.data;

              let image = data[0].images.full;
              if (!image) {
                image = data[0].images.icon;
              }

              const embed = {
                description: `**Type**: ${data[0].type.capitalize()} \n**Rarity**: ${data[0].rarity.capitalize()} \n**Obtained**: ${
                  data[0].obtained.obtained
                } ${data[0].obtained.type}  `,
                color: 9374122,
                timestamp: new Date(),
                footer: {
                  icon_url: `https://i.ebayimg.com/images/g/6ekAAOSw3WxaO8mr/s-l300.jpg`,
                  text: "Fortnite"
                },
                thumbnail: {
                  url: `https://i.ebayimg.com/images/g/6ekAAOSw3WxaO8mr/s-l300.jpg`
                },
                image: {
                  url: image
                },
                author: {
                  name: data[0].name,
                  icon_url: data[0].images.background
                }
              };
              message.channel.send({ embed });
            })
            .catch(error => {
              console.log(error);
              message.reply("Item not found");
            });
        }
      } else {
        message.reply(`Invalid Command.
To look up a players stats, use: \`!fortnite stats <window> <player> <platform>\`
To look up challenges, use: \`!fortnite challenges <season> <week>\`
To look up current store items, use: \`!fortnite store\`
To look up a specific item, use: \`!fortnite item <item name>\``);
      }
    }
  }
}

module.exports = FortniteCommand;
