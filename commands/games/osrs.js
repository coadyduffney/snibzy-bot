const Commando = require("discord.js-commando");
const osrs = require("osrs-wrapper");

class OsrsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "osrs",
      group: "games",
      memberName: "osrs",
      description: "Retrieves item price from GE or player highscores in OSRS."
    });
  }

  async run(message, args) {
    let newArgs = args.split(" ");

    if (!newArgs[0]) {
        message.reply('\nTo look up a players stats, use the following command: `!osrs lookup <player_name>`.\nTo look up an items GE price, use the following command: `!osrs price <item_name>`');
    }

    // Handle player lookup command
    // !osrs lookup player 
    if (newArgs[0] === 'lookup') {
        if (!newArgs[1]) {
            message.reply('Please provide me with a name to look up like this: `!osrs lookup snibzy`')
        } else {
            let name = newArgs[1];
            // console.log(name);
            message.reply(`Retrieving stats for ${name}...`);

            osrs.hiscores.getPlayer(name)
            .then(player => {
                // console.log(JSON.stringify(player, null, 2));
                
                let clues = {
                    easy: player.Minigames.Clue_Scrolls_Easy.score,
                    medium: player.Minigames.Clue_Scrolls_Medium.score,
                    hard: player.Minigames.Clue_Scrolls_Hard.score,
                    elite: player.Minigames.Clue_Scrolls_Elite.score,
                    master: player.Minigames.Clue_Scrolls_Master.score,
                }
            
                const embed = {
                    "title": "----------------------------------------------------------------------------",
                    "color": 13885999,
                    "timestamp": "2018-07-11T12:32:34.119Z",
                    "footer": {
                    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                    },
                    "author": {
                    "name": `Stats of ${name}`
                    },
                    "fields": [
                    {
                        "name": "Attack",
                        "value": player.Skills.Attack.level,
                        "inline": true
                    },
                    {
                        "name": "Hitpoints",
                        "value": player.Skills.Hitpoints.level,
                        "inline": true
                    },
                        {
                        "name": "Mining",
                        "value": player.Skills.Mining.level,
                        "inline": true
                    },
                            {
                        "name": "Strength",
                        "value": player.Skills.Strength.level,
                        "inline": true
                    },
                    {
                        "name": "Agility",
                        "value": player.Skills.Agility.level,
                        "inline": true
                    },
                    {
                        "name": "Smithing",
                        "value": player.Skills.Smithing.level,
                        "inline": true
                    },
                    {
                        "name": "Defence",
                        "value": player.Skills.Defence.level,
                        "inline": true
                    },
                    {
                        "name": "Herblore",
                        "value": player.Skills.Herblore.level,
                        "inline": true
                    },
                    {
                        "name": "Fishing",
                        "value": player.Skills.Fishing.level,
                        "inline": true
                    },
                    {
                        "name": "Ranged",
                        "value": player.Skills.Ranged.level,
                        "inline": true
                    },
                    {
                        "name": "Thieving",
                        "value": player.Skills.Thieving.level,
                        "inline": true
                    },
                    {
                        "name": "Cooking",
                        "value": player.Skills.Cooking.level,
                        "inline": true
                    },
                    {
                        "name": "Prayer",
                        "value": player.Skills.Prayer.level,
                        "inline": true
                    },
                    {
                        "name": "Crafting",
                        "value": player.Skills.Crafting.level,
                        "inline": true
                    },
                    {
                        "name": "Firemaking",
                        "value": player.Skills.Firemaking.level,
                        "inline": true
                    },
                    {
                        "name": "Magic",
                        "value": player.Skills.Magic.level,
                        "inline": true
                    },
                    {
                        "name": "Fletching",
                        "value": player.Skills.Fletching.level,
                        "inline": true
                    },
                    {
                        "name": "Woodcutting",
                        "value": player.Skills.Woodcutting.level,
                        "inline": true
                    },
                    {
                        "name": "Runecrafting",
                        "value": player.Skills.Runecrafting.level,
                        "inline": true
                    },
                    {
                        "name": "Slayer",
                        "value": player.Skills.Slayer.level,
                        "inline": true
                    },
                    {
                        "name": "Farming",
                        "value": player.Skills.Farming.level,
                        "inline": true
                    },
                    {
                        "name": "Construction",
                        "value": player.Skills.Construction.level,
                        "inline": true
                    },
                    {
                        "name": "Hunter",
                        "value": player.Skills.Hunter.level,
                        "inline": true
                    },
                    {
                        "name": "Total Level",
                        "value": player.Skills.Overall.level,
                        "inline": true
                    },
                    {
                    "name": "Clue Scrolls",
                    "value": `**Easy**: ${clues.easy}  |  **Medium**: ${clues.medium}  |  **Hard**: ${clues.hard}  |  **Elite**: ${clues.elite}  |  **Master**: ${clues.master}`
                    }
                    ]
                }

                message.channel.send({ embed });
                
            }).catch(error => {
                console.log(error)
                message.reply('Player not found.');
            })
        }  

    // Handle item price command
    } else if (newArgs[0] === 'price') {
        if (!newArgs[1]) {
            message.reply('Please provide me with an item to look up like this: `!osrs price item`')
        } else {
            let str = [];

            newArgs.forEach((arg) => {
                str.push(arg);
            });
            str.shift(); // removes 'price' from the array so we're just left with the item name strings
            let itemName = str.join(' ');

            message.reply(`Looking up price for ${itemName}...`);

            osrs.ge.getItem(itemName)
                .then(data => {

                    let object = JSON.parse(data);
                    let item = object.item;

                    const embed = {
                        "description": item.description,
                        "color": 3107810,
                        "timestamp": "2018-07-11T14:12:15.217Z",
                        "thumbnail": {
                          "url": item.icon_large
                        },
                        "author": {
                          "name": item.name,
                          "icon_url": item.icon
                        },
                        "fields": [
                          {
                            "name": "Current GE Price",
                            "value": item.current.price,
                            "inline": true
                          },
                          {
                            "name": "Current Trend",
                            "value": item.current.trend,
                            "inline": true
                          }
                        ]
                    }

                    message.channel.send({ embed });

                })
                .catch(error => {
                    console.log(error);
                    message.reply('Item not found');
                })
        }
    }
  }
}

module.exports = OsrsCommand;
