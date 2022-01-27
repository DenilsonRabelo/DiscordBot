'use strict'
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Discord = require('discord.js');
require("dotenv").config()
const translate = require('@vitalets/google-translate-api');
const client = new Discord.Client();

client.on("ready", () => {
    console.log("pronto")
})

client.on("message", (msg) => {

    if (msg.author.bot) return

    if (msg.channel.type === "dm") return

    if (msg.content === "!comandos") msg.channel.send("!gatinho !doguinho !curiosidade !anime img !anime gif !comandos !github nomeusuario")



    //Setor de imagens de gatos e cachorros//
    if (msg.content === '!gatinho') {
        const setings = { 'X-API-KEY': process.env.API_KEY_DOG_E_CAT }
        fetch(process.env.URL_GATINHO, setings)
            .then(response => {
                response.json()
                    .then(data => {
                        msg.channel.send(`Gatinho Gatinho Gatinhooooo !!!\n ${data[0]['url']}`)
                    }).catch(function (error) {
                        msg.channel.send("O gatinho correu sorry")
                    })
            })
    }
    if (msg.content === "!doguinho") {
        const setings = { 'X-API-KEY': process.env.API_KEY_DOG_E_CAT }
        fetch(process.env.URL_DOGUINHO, setings)
            .then(response => {
                response.json()
                    .then(data => {
                        msg.channel.send(`Doguinho doguinho doguinhooo !!!\n ${data[0]['url']}`)
                    }).catch(function (error) {
                        msg.channel.send("O doguinho tá dormindo")
                    })
            })
    }




    //Setor de curiosidades sobre numeros
    if (msg.content === "!curiosidade") {
        fetch(process.env.URL_CURIOSIDADES)
            .then(response => response.json())
            .then(data => translate(`${data["text"]}`, { from: 'en', to: 'pt' }).then(res => {
                msg.channel.send(`Uma curiosidade para ${msg.author.username}:\nVocê sabia que ${res.text}`)
            }).catch(err => { msg.channel.send("A curiosidade matou o gato") })
            ).catch(err => { msg.channel.send("A curiosidade matou o gato") })
    }





    //Setor imagem e gifs de anime//
    if (msg.content === "!anime img") {
        fetch(process.env.URL_BASE_ANIME + "nekos")
            .then(response => response.json())
            .then(data => {
                msg.channel.send(`Uma loli para ${msg.author.username}\nCriador : ${data["artist_name"]}\n ${data["url"]}`)
            }).catch(function () { msg.channel.send(`A loli sé escondeu ${msg.author.username}`) })
    }

    if (msg.content === "!anime gif") {
        const endpoints = ["baka", "bite", "blush", "bored", "cry", "cuddle", "dance", "facepalm", "feed", "happy", "highfive", "hug", "kiss", "laugh", "pat", "poke", "pout", "shrug", "slap", "sleep", "smile", "smug", "stare", "think", "thumbsup", "tickle", "wave", "wink"]
        const numero = Math.floor(Math.random() * endpoints.length);
        fetch(process.env.URL_BASE_ANIME + endpoints[numero])
            .then(response => response.json())
            .then(data => {
                msg.channel.send(`Uma loli para ${msg.author.username}\nAnime : ${data["anime_name"]}\n ${data["url"]}`)
            }).catch(function () { msg.channel.send(`A loli sé escondeu ${msg.author.username}`) })
    }

    //setor github
    if (msg.content.includes("!github")){
        let nome = msg.content.split(" ")
        if(nome === undefined) return msg.channel.send ("você deve inserir o nome do usuário")
        else {
            fetch(`https://api.github.com/users/${nome[1]}`)
                .then(res => {
                    res.json()
                    .then(data => msg.channel.send(data.login+","+data.id))
                    .catch(err => {msg.channel.send(`Ocorreu um erro o usuário ${nome[1]} não foi encontrado !!`)})
                }).catch(err => {msg.channel.send(`Ocorreu um erro no sistema`)})
        }

        
    }
})



client.login(process.env.TOKEN)

