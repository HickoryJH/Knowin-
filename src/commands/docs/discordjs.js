const SOURCES = ['stable', 'master', 'rpc', 'commando', 'akairo', 'akairo-master', 'collection'];

const fetch = require('node-fetch');
const { stringify } = require('querystring');

module.exports = {
  aliases: ['djs', 'docs'],
  usage: '<query> [source]',
  description: 'Searches the discord.js documentation.',
  async exec(message, args) {
    if (!args.length) {
      return message.reply('please provide a query.');
    }

    let source = SOURCES.includes(args[args.length - 1]) ? args.pop() : 'stable';
    const query = stringify({ src: source, q: args.join(' ') });
    const embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?${query}`).then(res =>
      res.json()
    );

    return message.channel.send({ embed });
  }
};
