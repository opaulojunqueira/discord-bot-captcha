exports.run = async (client, message, args, ops) => {
    message.channel.send(`📡 Ping: **${client.ws.ping}ms**\n📡 Ping DataBase: **3ms**`)
}