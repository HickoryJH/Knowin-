const BT = '`';

const getColors = require('../../util/getColors');

const format = colors => colors.map(r => r.name.slice(1)).join('`, `');

module.exports = {
  aliases: ['colors', 'colours', 'colorlist', 'colourlist'],
  description: 'Shows available colors.',
  exec: message => message.channel.send([
    '**Available Colors:**',
    `${BT}${format(getColors(message))}${BT}`
  ])
};
