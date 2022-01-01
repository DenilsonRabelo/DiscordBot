'use strict'
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Discord = require('discord.js');
const config = require("./config.json")
const translate = require('@vitalets/google-translate-api');
const client = new Discord.Client();

client.on("ready", () => {
    console.log("pronto")
})

client.on("message", (msg) => {

    if (msg.author.bot) return

    if (msg.channel.type === "dm") return

    if (msg.content === "!comandos") msg.channel.send("!gatinho !doguinho !curiosidade !comandos")



    //Setor de imagens de gatos e cachorros//

    if (msg.content === '!gatinho') {
        const setings = { 'X-API-KEY': config[1]["API-KEY-DOG-E-CAT"] }
        fetch(config[1]["url-gatinho"], setings)
            .then(response => {
                response.json()
                    .then(data => {
                        msg.channel.send("Gatinho Gatinho Gatinhooooo !!!")
                        msg.channel.send(data[0]['url'])
                    }).catch(function (error) {
                        msg.channel.send("O gatinho correu sorry")
                    })
            })
    }
    if (msg.content === "!doguinho") {
        const setings = { 'X-API-KEY': config[1]["API-KEY-DOG-E-CAT"] }
        fetch(config[1]["url-doguinho"], setings)
            .then(response => {
                response.json()
                    .then(data => {
                        msg.channel.send("Doguinho doguinho doguinhooo !!!")
                        msg.channel.send(data[0]['url'])
                    }).catch(function (error) {
                        msg.channel.send("O doguinho tá dormindo")
                    })
            })
    }

    //Setor de curiosidades sobre numeros
    if (msg.content === "!curiosidade") {
        fetch(config[2]["url-curiosidade"])
            .then(response => response.json())
            .then(data => translate(`${data["text"]}`, { from: 'en', to: 'pt' }).then(res => {
                msg.channel.send(`Uma curiosidade para ${msg.author.username}:\nVocê sabia que ${res.text}`)
            }).catch(err => {msg.channel.send("A curiosidade matou o gato")})
            )


        .catch(err => {msg.channel.send("A curiosidade matou o gato")})

    }
})



client.login(config[0]["Chave-discord"])
