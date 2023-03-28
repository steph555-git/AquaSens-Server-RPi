const Discord = require('discord.js')
const client = new Discord.Client({intents: 513})
const dotenv = require('dotenv'); dotenv.config()
const token = process.env.DISCORD_TOKEN

const getSensorsList = require('../js/callSensors')


client.once('ready', () => {
   console.log('AquaSens-bot est pret à vous servir');
});

client.login(token);



client.on("messageCreate", message => {
    if (message.content === "!ping") {
        //getSensorsList()
        message.channel.send("Message 1")
        console.log("Message envoyé : Message1")
    }
  })
  client.on("messageCreate", message => {
    if (message.content === "!pong") {
        //getSensorsList()
        message.channel.send("Message 2")
        console.log("Message envoyé : Message 2")
    }
  })