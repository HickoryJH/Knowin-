const USE_THE_COLORS = 'Use the `colors` command to get a list of supported colors.';

const getColors = require('../../util/getColors');

module.exports = {
  aliases: ['color', 'colour'],
  usage: '<color>',
  description: 'Gives you a color.',
  async exec(message, [name]) {
    if (!name) {
      return message.reply(`you need to specify your desired color. ${USE_THE_COLORS}`);
    }
    name = name.replace(/^#?/, '#').toLowerCase();

    const colors = getColors(message);
    await message.member.roles.remove(colors);

    if (name !== '#none') {
      const role = colors.find(r => r.name.toLowerCase() === name);
      if (!role) {
        return message.reply(`We don't have that here. ${USE_THE_COLORS}`);
      }
      await message.member.roles.add(role);
      return message.reply(`applied ${role.name.slice(1)} to you!`);
    }

    return message.reply('removed all colors from you.');
  }
};
