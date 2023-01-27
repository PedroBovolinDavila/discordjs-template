const { Client } = require("discord.js");
const ascii = require('ascii-table')
const fs = require('node:fs');
const path = require("node:path");

/**
 * Event handler to Client
 * 
 * @param {Client<boolean>} client
 */
function eventHandler(client) {
  const eventDir = path.join(__dirname, '..', 'events')

  const table = new ascii()
  table.setHeading('Evento', 'Status')

  const eventFolders = fs.readdirSync(eventDir)

  for (const folder of eventFolders) {
    const eventFiles = fs
      .readdirSync(`${eventDir}/${folder}`)
      .filter(file => file.endsWith('.js'))

    for (const file of eventFiles) {
      const event = require(`../events/${folder}/${file}`)

      if (event.rest) {
        if (event.once) {
          client.rest.once(event.name, (...args) => {
            event.execute(...args, client)
          })
        } else {
          client.rest.on(event.name, (...args) => {
            event.execute(...args, client)
          })
        }
      } else {
        if (event.once) {
          client.once(event.name, (...args) => {
            event.execute(...args, client)
          })
        } else {
          client.on(event.name, (...args) => {
            event.execute(...args, client)
          })
        }
      }
      
      const fileName = file.split('.js')[0]
      table.addRow(fileName, 'Carregado')
      continue
    }
  }

  console.log(table.toString(), '\nEventos carregados');
}

module.exports = { eventHandler }
