'use strict'
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = 'Seu Token aqui'

client.on("ready", () => {
    console.log("pronto")
})

client.on("message", (msg) => {


    if (msg.author.bot) return

    if (msg.channel.type === "dm") return

    if(msg.content === "!comandos") msg.channel.send("!gatinho !doguinho")

    if (msg.content === '!gatinho') {
        //imagem de gatinhos
        const setings = {
            'X-API-KEY': '000c9001-3a9e-4b8f-a48d-2c8b7f3d0913',
        }
        fetch(`https://api.thecatapi.com/v1/images/search?limit=1`, setings)
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
        //imagem de doguinhos
        const setings = {
            'X-API-KEY': '000c9001-3a9e-4b8f-a48d-2c8b7f3d0913',
        }
        fetch(`https://api.thedogapi.com/v1/images/search?limit=1`, setings)
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
})
client.login(TOKEN)
