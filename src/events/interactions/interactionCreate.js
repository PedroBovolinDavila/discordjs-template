const { CommandInteraction, Client, ChatInputCommandInteraction } = require('discord.js')

module.exports = {
  name: 'interactionCreate',

  /**
   * 
   * @param {CommandInteraction} interaction 
   * @param {Client<boolean>} client 
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) {
      return
    }

    const command = client.commands.get(interaction.commandName)

    if (!command) {
      interaction.reply({ 
        content: 'Este comando não existe.'
      })
      return
    }

    command.execute(interaction, client)    
  }
}
