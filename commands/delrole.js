const db = require('quick.db')
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<:AVISO:592056840943304704> | Você não possui permissão para executar esse comando!\nPermissão necessária `ADMINISTRATOR`.')
    let setrole = db.fetch(`role.${message.guild.id}`);
    if (setrole == null) {
        message.channel.send('<:AVISO:592056840943304704> | Não existe um cargo definido para remover do banco de dados.')
    } else if (setrole === setrole) {
        message.channel.send('<:lixeira:824018325713059890> | Cargo foi **__removido__** com sucesso!')
        db.delete(`role.${message.guild.id}`)
    }
}