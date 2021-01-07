module.exports = {
  aliases: ['ping', 'pong'],
  description: "Shows the bot's latency.",
  async exec(message) {
    const msg = await message.channel.send('Pinging...');
    const ping = msg.createdTimestamp - message.createdTimestamp;

    return msg.edit([
      `**Bot Latency:** \`${ping}ms\``,
      `**API Latency:** \`${Math.round(message.client.ws.ping)}ms\``
    ]);
  }
};
