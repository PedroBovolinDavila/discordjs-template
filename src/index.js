const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js')
const { BotConfig } = require('./config')

const { eventHandler } = require('./handlers/eventHandler')
const { loadCommands } = require('./handlers/commandHandler')

const { Guilds, GuildMessages, GuildMembers } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember } = Partials

const client = new Client({
  intents: [Guilds, GuildMessages, GuildMembers],
  partials: [User, Message, GuildMember, ThreadMember]
}) 

client.commands = new Collection()
client.config = BotConfig

client.login(client.config.token)
  .then(() => {
    eventHandler(client)
    loadCommands(client)
  })

