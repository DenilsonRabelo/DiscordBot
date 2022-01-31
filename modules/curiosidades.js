'use strict'
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
import 'dotenv/config'
import translate from "@vitalets/google-translate-api"

export function curiosidades(msg) {
    fetch(process.env.URL_CURIOSIDADES)
        .then(response => response.json())
        .then(data => translate(`${data["text"]}`, { from: 'en', to: 'pt' }).then(res => {
            msg.channel.send(`Uma curiosidade para ${msg.author.username}:\nVocê sabia que ${res.text}`)
        }).catch(err => { msg.channel.send("A curiosidade matou o gato") })
        ).catch(err => { msg.channel.send("A curiosidade matou o gato") })
}