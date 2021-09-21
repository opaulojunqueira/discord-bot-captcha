const db = require('quick.db');
exports.run = async (client, message, args, ops) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<:AVISO:592056840943304704> | Você não possui permissão para executar esse comando!\nPermissão necessária `ADMINISTRATOR`.')
    let channel = message.channel.id,
        setchannel = db.fetch(`channel.${message.guild.id}`);
    if (setchannel == null) {
        db.set(`channel.${message.guild.id}`, channel)
        message.channel.send('<:concluido:604106430038933516> | Chat de captchas foi **__definido__** com sucesso!');
    } else {
        message.channel.send(`<:AVISO:592056840943304704> | Chat de captchas já foi definido em <#${setchannel}>.`);
    }
}