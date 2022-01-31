import puppeteer from 'puppeteer'
import { MessageEmbed } from 'discord.js'

export async function tabela(msg) {
    const browser = await puppeteer.launch({ headless: true, defaultViewport: false })
    const page = await browser.newPage()
    await page.goto('https://www.terra.com.br/esportes/futebol/brasileiro-serie-a/tabela/')
    const times = []
    const tabelaSeletor = '#mod-603-standings-round-robin > div.ctn-cols.clearfix > div.col-main > table > tbody'
    const tabelatamanho = await page.$$eval(`${tabelaSeletor} > tr`, el => el.length)
    for (let i = 1; i < tabelatamanho + 1; i++) {
        const nome = await page.evaluate(el => el.innerText, await page.$(`${tabelaSeletor} > tr:nth-child(${i}) > td:nth-child(3)`))
        const pontos = await page.evaluate(el => el.innerText, await page.$(`${tabelaSeletor} > tr:nth-child(${i}) > td:nth-child(5)`))

        const atualTime = [nome, pontos]
        times.push(atualTime)
    }
    await browser.close()

    const keys = Object.keys(times)
    const keysmap = keys.map(function (key) {
        const posição = parseInt(key) + 1
        const texto = posição + " - " + times[key] + "  pts" + "\n"
        return texto.replace(",", "  |   ")
    })
    const modelo = new MessageEmbed()
        .setColor('ae2012')
        .setThumbnail('https://logospng.org/wp-content/uploads/brasileirao-serie-a.png')
        .setTitle('Tabela Brasileirão')
        .setDescription(keysmap.join(" "))
    msg.channel.send(modelo)
}





