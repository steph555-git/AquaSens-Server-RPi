const {Client, Collection} = require("discord.js")
const dotenv = require('dotenv'); dotenv.config()
const client = new Client({intents: 513})

client.commands = new Collection()

//['CommandUtil','EventUtil'].forEach(element => { require(`./utils/handlers/${element}`)(client) });
require('./utils/handlers/CommandUtil')(client)
require('./utils/handlers/EventUtil')(client)

process.on('exit', code => { console.log(`Le processus s'est arreté avec le code: ${code}`)})
process.on('uncaughtExeption', (err, origin) => { console.log(`UNCAUGHT_EXEPTION: ${err}`, `Origine: ${origin}` )})
process.on('unhandledRejection', (reason, promise) => { console.log(`UNHANDLED_REJECTION: ${reason}\n -------\n`, promise)})
process.on('warning', (...args) => console.log(...args))


client.login(process.env.DISCORD_TOKEN)
