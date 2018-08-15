const Commando = require('discord.js-commando');
const music = require('discord.js-musicbot-addon');
const bot = new Commando.Client();
const config = require('./config');
const token = config.token;

// Commands Location
bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('games', 'Games');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('message', (message) => {
    if (message.content == 'Hello') {
        message.channel.send(`Hello, ${message.author} ;)`);
    }
});

music.start(bot, {
  youtubeKey: config.youtubeKey, // Change to your youtube key.
  prefix: '++',
  anyoneCanLeave: true,
  anyoneCanJoin: true,
  anyoneCanAdjust: true,
  anyoneCanSkip: true,
  enableQueueStat: true,
  requesterName: true,
  clearInvoker: true,
  maxQueueSize: 10,
  enableQueueStat: true,
  checkQueues: true
});


// Lets us know when the bot is ready to be used
bot.on('ready', () => {
    console.log('Snibzy-Bot Initialized');
});

// Logs bot into our server
bot.login(token);