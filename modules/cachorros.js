'use strict'
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
import 'dotenv/config'

export function cachorros(msg) {
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