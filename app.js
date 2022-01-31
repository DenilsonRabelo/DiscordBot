import {gatinho} from './modules/gatos.js';
import { perfilgithub } from './modules/github.js';
import { cachorros } from './modules/cachorros.js';
import { tabela} from './modules/tabelaBrasileirão.js';
import { animeImagem, animeGif } from './modules/anime.js';
import { curiosidades } from './modules/curiosidades.js';
import Discord from 'discord.js'
const client = new Discord.Client();

client.on("ready", () => {
    console.log("pronto")
})


client.on("message", (msg) => {

    if (msg.author.bot) return
    if (msg.channel.type === "dm") return
    if (msg.content === "!comandos") msg.channel.send("!gatinho !doguinho !curiosidade !anime img !anime gif !comandos !github nomeusuario")
    if (msg.content === '!gatinho') gatinho(msg)
    if (msg.content === "!doguinho") cachorros(msg)
    if (msg.content === "!curiosidade") curiosidades(msg)
    if (msg.content === "!anime img") animeImagem(msg)
    if (msg.content === "!anime gif") animeGif(msg)
    if (msg.content.includes("!github")) perfilgithub(msg)
    if (msg.content === "!tabela") tabela(msg)

})

client.login(process.env.TOKEN)

