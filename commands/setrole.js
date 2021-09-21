const db = require('quick.db');
exports.run = async (client, message, args, ops) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<:AVISO:592056840943304704> | Você não possui permissão para executar esse comando!\nPermissão necessária `ADMINISTRATOR`.')
    let role = args.join(" "),
        setrole = db.fetch(`role.${message.guild.id}`);
    if (setrole == null) {
        if (!role) return message.channel.send('<:AVISO:592056840943304704> | Precisa inserir a ID do cargo. __Exemplo: s!setrole 732408128607617034__');
        db.set(`role.${message.guild.id}`, role);
        message.channel.send('<:concluido:604106430038933516> | Cargo foi **__definido__** com sucesso!');
    } else {
        message.channel.send(`<:AVISO:592056840943304704> | Cargo já foi definido, confira <@&${setrole}>.`);
    }
}