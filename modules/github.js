'use strict'
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


export function perfilgithub(msg) {
    let nome = msg.content.split(" ")
    if (nome === undefined) return msg.channel.send("você deve inserir o nome do usuário")
    else {
        fetch(`https://api.github.com/users/${nome[1]}`)
            .then(res => {
                res.json()
                    .then(data => msg.channel.send(data.login + "," + data.id))
                    .catch(err => { msg.channel.send(`Ocorreu um erro o usuário ${nome[1]} não foi encontrado !!`) })
            })
            .catch(err => { msg.channel.send(`Ocorreu um erro no sistema`) })
    }
}