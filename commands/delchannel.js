const db = require('quick.db')
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<:AVISO:592056840943304704> | Você não possui permissão para executar esse comando!\nPermissão necessária `ADMINISTRATOR`.')
    let setchannel = db.fetch(`channel.${message.guild.id}`);
    if (setchannel == null) {
        message.channel.send('<:AVISO:592056840943304704> | Não existe um chat de captcha definido para remover do banco de dados.');
    } else if (setchannel === setchannel) {
        message.channel.send('<:lixeira:824018325713059890> | Chat de captcha foi **__removido__** com sucesso!');
        db.delete(`channel.${message.guild.id}`);
    }
}