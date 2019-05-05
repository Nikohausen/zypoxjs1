const Discord = require('discord.js')
const fs = require('fs')

const Cxp = require('./xp')
const Crealxp = require('./realxp')
const Cseexp = require('./seexp')
const Cseerealxp = require('./seerealxp')
const Cstop = require('./stop')
const Cinfo = require('./info')
const Cwarnings = require('./warnings')

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const COLORS = {
    red: 0xe74c3c,
    green: 0x2ecc71
}

function xp(msg) {
	Cxp.xp(msg)
}
function realxp(msg) {
	Crealxp.realxp(msg)
}
function seexp(msg) {
	Cseexp.seexp(msg)
}
function seerealxp(msg) {
	Cseerealxp.seerealxp(msg)
}
function stop(msg) {
	Cstop.stop(msg)
}
function info(msg) {
	Cinfo.info(msg)
}
function warnings(msg) {
	Cwarnings.warnings(msg)
}


module.exports = {
	newmessage(msg) {
		if (msg.content === `${config.prefix}xp`) {
			xp(msg)
		}
		if (msg.content === `${config.prefix}realxp`) {
			realxp(msg)
		}
		if (msg.content.startsWith(`${config.prefix}seexp`)) {
			seexp(msg)
		}
		if (msg.content.startsWith(`${config.prefix}seerealxp`)) {
			seerealxp(msg)
		}
		if (msg.content.startsWith(`${config.prefix}stop`)) {
			stop(msg)
		}
		if (msg.content === `${config.prefix}info`) {
			info(msg)
		}
		if (msg.content.startsWith(`${config.prefix}warnings`)) {
			warnings(msg)
		}
	}
}
