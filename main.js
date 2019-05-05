const Discord = require('discord.js')
const fs = require('fs')

const Mmoney = require('./money')
const Mgivemoney = require('./givemoney')
const Mcheatmoney = require('./cheatmoney')
const Mwork = require('./work')
const Mlottery = require('./lottery')


const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const COLORS = {
    red: 0xe74c3c,
    green: 0x2ecc71
}

function money(msg) {
	Mmoney.money(msg)
}
function pay(msg) {
	Mpay.pay(msg)
}
function givemoney(msg) {
	Mgivemoney.givemoney(msg)
}
function cheatmoney(msg) {
	Mcheatmoney.cheatmoney(msg)
}
function work(msg) {
	Mwork.work(msg)
}
function lottery(msg) {
	Mlottery.lottery(msg)
}

module.exports = {
	newmessage(msg) {
		if (msg.content === `${config.prefix}money`) {
			money(msg)
		}
		if (msg.content.startsWith(`${config.prefix}pay`)) {
			pay(msg)
		}
		if (msg.content.startsWith(`${config.prefix}givemoney`)) {
			givemoney(msg)
		}
		if (msg.content.startsWith(`${config.prefix}cheatmoney`)) {
			cheatmoney(msg)
		}
		if (msg.content === `${config.prefix}work`) {
			work(msg)
		}
		if (msg.content.startsWith(`${config.prefix}lottery`)) {
			lottery(msg)
		}
	}
}
