const { Client } = require('discord.js')
const ascii = require('ascii-table')
const path = require('node:path')
const fs = require('node:fs')

const commandsArray = []

/**
 * Command handler
 * 
 * @param {Client<boolean>} client
 */
function loadCommands(client) {
  const commandsDir = path.join(__dirname, '..', 'commands')

  const table = new ascii()
  table.setHeading('Comando', 'Status')

  const commandFolders = fs.readdirSync(commandsDir)

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`${commandsDir}/${folder}`)
      .filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`)

      client.commands.set(command.data.name, command)

      commandsArray.push(command.data.toJSON())

      table.addRow(file, 'Loaded')
      continue;
    }
  }

  client.application.commands.set(commandsArray)

  console.log(table.toString(), '\nComandos');
}

module.exports = { loadCommands }
