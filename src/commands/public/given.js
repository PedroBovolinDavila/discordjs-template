const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dado')
    .setDescription('Exibe um numero de 1 a 6.'),
  execute(interaction) {
    const number = Math.ceil(Math.random() * 6)

    interaction.reply({
      content: number.toString()
    })
  }
}