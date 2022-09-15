import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

import testSchema from './test-schema.js'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]    
})

client.on('ready', ()=>{
    console.log('The bot is ready')

    const guildId = '994645591676174416'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild){
        commands=guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong.',
    })


})

client.on('ready', async() => {
    await mongoose.connect(
        process.env.MONGO_URI,
        {
            keepAlive: true
        }
    )

    setTimeout(async () => {
        await new testSchema({
            message: 'hello world',
        }).save()
    }, 1000)
})

client.on('interactionCreate', async (interaction) =>{
    if (!interaction.isCommand()){
        return
    }

    const {commandName, options} = interaction

    if (commandName === 'ping'){
        interaction.reply({
            content: 'pong',
            ephemeral: true, 
        })
    }
})

client.on('messageCreate', (message) =>{
    if (message.content === 'ping'){
        message.reply({
            content: 'pong',
        })
    }
})

client.login(process.env.TOKEN)
