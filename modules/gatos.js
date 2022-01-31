'use strict'
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
import 'dotenv/config'
import { MessageEmbed } from 'discord.js'

export function gatinho(msg) {
    const setings = { 'X-API-KEY': process.env.API_KEY_DOG_E_CAT }
    fetch(process.env.URL_GATINHO, setings)
        .then(response => response.json())
        .then(data => {
            const modelo = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Ayaya')
                .setImage(`${data[0]['url']}`)
                .addFields(
                    { name: 'Altura', value: `${data[0]['height']}`, inline: true },
                    { name: 'Largura', value: `${data[0]['width']}`, inline: true },
                )
                .setThumbnail('https://lh3.googleusercontent.com/HRXKrGHs74T-adb9SfBrpeFQrsr7zhoHYiQZoSRduW-B_rj7ZxZf50wx2dpVc_NkkYiJ')
            return msg.channel.send(modelo)
        }).catch(function (error) {
            msg.channel.send("O doguinho tá dormindo")
        })
}