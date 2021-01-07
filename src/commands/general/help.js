const BT = '`';

const { MessageEmbed } = require('discord.js');
const prefix = process.env.PREFIX.toLowerCase();

const usage = c => `${c.aliases[0]} ${c.usage}`.trim();

module.exports = {
  aliases: ['help', 'commands'],
  description: 'Shows the available commandsץ',
  exec(message) {
    const cmds = message.client.commands.sort((a, b) =>
      a.aliases[0] > b.aliases[0] ? 1 : b.aliases[0] > a.aliases[0] ? -1 : 0
    );

    const embed = new MessageEmbed()
      .setTitle(`Command List [${cmds.length}]`)
      .setDescription(cmds.map(cmd => `${BT}${prefix}${usage(cmd)}${BT} - ${cmd.description}`))
      .setTimestamp()
      .setFooter('<Required> [Optional]');

    return message.channel.send({ embed });
  }
};
