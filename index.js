const Commando = require('discord.js-commando');
const music = require('discord.js-musicbot-addon');
const bot = new Commando.Client();
const token = 'NDY1ODUzMDI5MTYyMjg3MTI0.DiTkBg.apoEqsfdp2jJwM0bnVT_MUadfhc';

// Commands Location
bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('games', 'Games');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('message', (message) => {
    if (message.content == 'Hello') {
        message.channel.send(`Hello, ${message.author} ;)`);
    }
});

music.start(bot, {
  youtubeKey: 'AIzaSyAaeSv5Yi3avM8dLHoW8wPGGFAAMLhWlNE',
  prefix: '++',
  anyoneCanLeave: true,
  anyoneCanJoin: true,
  anyoneCanAdjust: true,
  anyoneCanSkip: true,
  enableQueueStat: true,
  logging: true,
  requesterName: true,
  botAdmins: ['nutos#9229', 'atapper25#0897', 'Snibzy#0424']
});


// Lets us know when the bot is ready to be used
bot.on('ready', () => {
    console.log('Snibzy-Bot Initialized');
});

// Logs bot into our server
bot.login(token);

// Authorize Bot in server
// https://discordapp.com/api/oauth2/authorize?client_id=465853029162287124&scope=bot&permissions=1