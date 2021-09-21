const Discord = require('discord.js');
exports.run = async (client, message, args, ops) => {
    let embed = new Discord.MessageEmbed()
        .setTitle('<:pasta:591715823312437266> **PASTA DE COMANDOS:**')
        .setDescription('`s!setchannel` » Defina o chat para realizar as captchas.\n`s!delchannel` » Revome o chat de captchas.\n`s!setrole <role_id>` » Defina um cargo a ser atribuido apôs a captcha.\n`s!delrole` » Revome o cargo.\n`s!captcha` » Realize as captchas.')
        .setColor('#964B00')
        .setFooter(`Comando executado por: ${message.author.tag}`)
        .setTimestamp()
    message.channel.send(embed)
}