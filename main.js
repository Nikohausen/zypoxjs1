const Discord = require('discord.js')
const fs = require('fs')

const CommandsMain = require('./src/cmds/main')
const MoneyMain = require('./src/money/main')

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const bannedwords = JSON.parse(fs.readFileSync('banned_words.json', 'utf8'))
const blocked = config.blocked

function newmessage(msg) {
	CommandsMain.newmessage(msg)
	MoneyMain.newmessage(msg)
}



var client = new Discord.Client()
client.on('ready', () => {
   console.log(`Logged in as ${client.user.username}...`)
})


client.on('message', (msg) => {
	newmessage(msg)
})


client.on('message', (msg) => {
    //ZYPOX REACTION
    var zypoxwords = ['zypox', 'Zypox', 'Zypoxele']
    if (msg.author.id in config.blocked) {
    	
    }
    else {
    	var splittes = 1
    	for (z = 0; z < msg.content.length; z++) {
    		var tile = msg.content.slice(z, z+1)
    		if (tile === ' ') {
    			var splittes = splittes + 1
    		}
    	}
    	for (y = 0; y < splittes; y++) {
    		var slice = msg.content.split(' ').slice(y)
    		for (x = 0; x < 3; x++) {
    			if (slice[0] === zypoxwords[x]) {
    				msg.react('572067618857418753')
    			}
    		}
    	}
    	for (y = 0; y < splittes; y++) {
    		var slice = msg.content.split(' ').slice(y)
    		for (x = 0; x < bannedwords.length; x++) {
    			if (slice[0] === bannedwords[x]) {
    				msg.delete()
    				
    				//save warning
    				try {
    					var warnings = JSON.parse(fs.readFileSync(`./warnings/${msg.author.id}.json`, 'utf8'))
    					var list = warnings.warned + 1
    					fs.writeFileSync(`./warnings/${msg.author.id}.json`, `{\n    \"warned\": ${list}\n}`)
    				} 
    				catch(e) {
    					fs.writeFileSync(`./warnings/${msg.author.id}.json`, `{\n    \"warned\": 1\n}`)
    				}
    				
    				var warnings = JSON.parse(fs.readFileSync(`./warnings/${msg.author.id}.json`, 'utf8'))
    				if (warnings.warned === 5) {
    					msg.reply('Du wurdest aufgrund von Beleidigungen gemuted! Lasse dich entmuten, indem du einen Antrag unter  http://forum.zypox.bplaced.net (--> Discord Reports & Entbannung) stellst')
    					msg.member.removeRole('519559352302960651')
    					msg.member.addRole('466878902250242052')
    				}
    			}
    		}
    	}
    }
    try {
		fs.appendFileSync(`./msglogs/log.txt`, `\n${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)
	}
	catch(e) {
		fs.writeFileSync(`./msglogs/log.txt`, `${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)
	}
    //nachrichten in Console
    console.log(`--> ${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)

    //XP System
    var id = msg.author.id
    try {
        var iddata = JSON.parse(fs.readFileSync(`./data/${id}.json`, 'utf8'))
	}
	catch(e) {
        fs.writeFileSync(`./data/${id}.json`, `{\n    "${id}": 0\n}`)
    }

    var iddata = JSON.parse(fs.readFileSync(`./data/${id}.json`, 'utf8'))

    var lenght = msg.content.length
    var points = iddata[id]



    if (iddata === '') {
        console.log(`Error: Fehler in ${id}.json`)
        iddata[id] = points
    }
    else {
		if (msg.author.id in config.xpblocked) {

		}
		else {
			delete iddata[id]

        	pointsnew = points + lenght
        	console.log(`Neuer Xp-Wert für ${msg.author.username}: ${pointsnew}!`)
        	if ('infinity' in iddata) {
        		fs.writeFileSync(`./data/${id}.json`, `{\n    "${id}": ${pointsnew},\n    "infinity": 1\n}`)
        	}
        	else {
        		fs.writeFileSync(`./data/${id}.json`, `{\n    "${id}": ${pointsnew}\n}`)
        	}
		}
    }
})
	


//AUTOPREFIX

const PRES = {
	"566307942526222337": "[Besitzer]",
	"515186780736323589": "[Leitung]",
	"571453160506261510": "[SrStaff]",
	"465992722835177502": "[Staff]",
	"539539878019334159": "[P-Staff]",
	"561237688896847873": "[Cutter]",
	"483597882700726275": "[Designer]",
	"459341817255559169": "[Freund]",
	"459340366571765772": "[YT]",
	"569462230333259782": "[Luxus]",
	"563457472040534027": "[VIP]",
	"466878902250242052": "[Muted]"
}

client.on('guildMemberUpdate', (mold, mnew) => {
	var guild = mnew.guild 
	if (mold.roles.array().length < mnew.roles.array().length) {
		var role = mnew.roles.find(r => mold.roles.find(rold => rold.id == r.id) == null)
		if (role.id in PRES) {
			mnew.setNickname(`${PRES[role.id]} ${mnew.displayName}`)
		}
	}
	else if (mold.roles.array().length > mnew.roles.array().length) {
		var role = mold.roles.find(r => mnew.roles.find(rold => rold.id == r.id) == null)
		if (role.id in PRES) {
			mnew.setNickname(mnew.displayName.substr(PRES[role.id].length + 1)) } 
	}
})
	
const pres = {
	"566307942526222337": "[Besitzer]",
	"515186780736323589": "[Leitung]",
	"571453160506261510": "[SrStaff]",
	"465992722835177502": "[Staff]",
	"539539878019334159": "[P-Staff]",
	"561237688896847873": "[Cutter]",
	"483597882700726275": "[Designer]",
	"459341817255559169": "[Freund]",
	"459340366571765772": "[YT]",
	"569462230333259782": "[Luxus]",
	"563457472040534027": "[VIP]",
	"466878902250242052": "[Muted]"
}


client.on('guildMemberUpdate', (mold, mnew) => {
	var guild = mnew.guild
	if (mold.roles.array().length < mnew.roles.array().length) {
		var role = mnew.roles.find(r => mold.roles.find(r2 => r2.id == r.id) == null)
		if (role.id in pres) {
			mnew.setNickname(`${pres[role.id]} ${mnew.displayName}`)
		}
		else if (mold.roles.array().length > mnew.roles.array().length) {
			var role = mold.roles.find(r => mnew.roles.find(r2 => r2.id == r.id) == null)
			if (role.id in pres) {
				mnew.setNickname(mnew.displayName.substr(pres[role.id].length + 1))
			}
		}
	}
})



client.login(config.token)
    