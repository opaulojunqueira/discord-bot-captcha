exports.run = async (client, message, args, ops) => {
    message.channel.send(`š” Ping: **${client.ws.ping}ms**\nš” Ping DataBase: **3ms**`)
}