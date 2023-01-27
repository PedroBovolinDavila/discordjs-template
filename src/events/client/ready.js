const { Client } = require("discord.js");

module.exports = {
  name: 'ready',
  once: true,

  /**
   * 
   * @param {Client<boolean>} client 
   */
  execute(client) {
    console.log(`Logged ${client.user.username}`);
  }
}