'use strict'
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
import 'dotenv/config'

export function animeImagem(msg) {
    fetch(process.env.URL_BASE_ANIME + "nekos")
        .then(response => response.json())
        .then(data => {
            msg.channel.send(`Uma loli para ${msg.author.username}\nCriador : ${data["artist_name"]}\n ${data["url"]}`)
        }).catch(function () { msg.channel.send(`A loli sé escondeu ${msg.author.username}`) })
}

export function animeGif(msg) {
    const endpoints = ["baka", "bite", "blush", "bored", "cry", "cuddle", "dance", "facepalm", "feed", "happy", "highfive", "hug", "kiss", "laugh", "pat", "poke", "pout", "shrug", "slap", "sleep", "smile", "smug", "stare", "think", "thumbsup", "tickle", "wave", "wink"]
    const numero = Math.floor(Math.random() * endpoints.length);
    fetch(process.env.URL_BASE_ANIME + endpoints[numero])
        .then(response => response.json())
        .then(data => {
            msg.channel.send(`Uma loli para ${msg.author.username}\nAnime : ${data["anime_name"]}\n ${data["url"]}`)
        }).catch(function () { msg.channel.send(`A loli sé escondeu ${msg.author.username}`) })
}
