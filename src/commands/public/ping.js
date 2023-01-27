const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Retorna pong')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Only for admins
  execute(interaction) {
    interaction.reply({
      content: 'Pongo',
      ephemeral: true
    })
  }
}
