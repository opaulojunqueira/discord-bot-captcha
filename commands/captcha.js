const Discord = require('discord.js');
const axios = require('axios');
const db = require('quick.db');
exports.run = async (client, message, args, ops) => {
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    var role_id = await db.fetch(`role.${message.guild.id}`),
        channel = await db.fetch(`channel.${message.guild.id}`),
        captcha_db = await db.get(`captcha.time.${message.author.id}`),
        before_captcha = await db.get(`before.captcha.${message.author.id}`),
        captcha_time = 70000,
        before_captcha_time = 90000;
    if (channel == null) return message.channel.send('<:AVISO:592056840943304704> | Chat não foi definido, use o comando `s!setchannel`')
    if (role_id == null) return message.channel.send('<:AVISO:592056840943304704> | Cargo não foi definido, use o comando `s!setrole`')
    if (message.channel.id === channel) {
        if (before_captcha !== null && before_captcha_time - (Date.now() - before_captcha) > 0) {
            let before_captcha_timeObj = before_captcha_time - (Date.now() - before_captcha);
            message.reply(`<:AVISO:592056840943304704> | Calma! Você acabou de entrar no servidor, aguarde: **${millisToMinutesAndSeconds(before_captcha_timeObj)}** para usar o comando.`)
        } else {
            if (captcha_db !== null && captcha_time - (Date.now() - captcha_db) > 0) {
                let captcha_timeObj = captcha_time - (Date.now() - captcha_db);
                message.reply(`<:AVISO:592056840943304704> | Você já tentou realizar uma captcha recentemente, aguarde: **${millisToMinutesAndSeconds(captcha_timeObj)}**`)
            } else {
                db.set(`captcha.time.${message.author.id}`, Date.now())
                axios.get(`https://api.no-api-key.com/api/v2/captcha`).then(async res => {
                    let role_v = message.guild.roles.cache.find(role => role.id === role_id),
                        member = message.member;
                    db.set(`captcha.${message.guild.id}.${message.author.id}`, res.data.captcha_text)
                    let embed = new Discord.MessageEmbed()
                        .setDescription('⚠️ | Para verificar faça a captcha abaixo. Digite as letras:')
                        .setImage(res.data.captcha)
                        .setColor('#964B00')
                        .setFooter(`Crie seu Bot de Catpcha: bit.ly/botcaptcha`)
                        .setTimestamp()
                    message.reply('', embed).then(msg => {
                        const filter = m => m.author.id === message.author.id;
                        const collector = msg.channel.createMessageCollector(filter, { max: 1 });
                        collector.on('collect', m => {
                            var msgcaptcha = m.content
                            if (msgcaptcha === db.fetch(`captcha.${message.guild.id}.${message.author.id}`)) {
                                message.reply('<:concluido:604106430038933516> | Você **__acertou__** a captcha!')
                                member.roles.add(role_v)
                                db.delete(`captcha.${message.guild.id}.${message.author.id}`)
                                db.delete(`captcha.time.${message.author.id}`)
                                db.delete(`before.captcha.${message.author.id}`)
                            } else {
                                message.reply('<:AVISO:592056840943304704> | Você **__errou__** a captcha! Tente novamente usando o comando `s!captcha`.')
                            }
                        })
                    })
                })
            }
        }
    }
    return
}