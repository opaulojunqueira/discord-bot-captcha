const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const active = new Map();
var prefix = config.prefix;

client.on('ready', () => {
    console.log('[BOT] Started.')
});

client.on('message', message => {
    if (message.mentions.has(config.bot_id) && message.content === `<@!${config.bot_id}>`) {
        if (message.author.bot) return
        const message_bot = message.channel.send(`Opa ${message.author}, me chamo ` + '`' + `${config.bot_name}` + '`' + `.\nPara saber mais sobre mim, digite: **${config.prefix}help**.`);
        setTimeout(() => { message_bot.delete(); }, 10000)
        message.delete()
    }
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    let args = message.content.split(" ").slice(1);
    try {
        let ops = {
            active: active
        }
        let commands = require(`./commands/${command}.js`);
        commands.run(client, message, args, ops);
    } catch (e) {
        // console.log(e);
    } finally { }
});

client.login(config.token)