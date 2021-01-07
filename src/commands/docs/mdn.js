const API = 'https://mdn.pleb.xyz/search';
const MDN = 'https://developer.mozilla.org';
const COLOR = 0x066fad;

const { MessageEmbed } = require('discord.js');
const { stringify } = require('querystring');
const fetch = require('node-fetch');
const Turndown = require('turndown');

module.exports = {
  aliases: ['mdn'],
  usage: '<query>',
  description: 'Searches the Mozilla Developer Network.',
  async exec(message, args) {
    if (!args.length) {
      return message.reply('please provide a query.');
    }

    const body = await fetch(`${API}?${stringify({ q: args.join(' ') })}`).then(res => res.json());
    if (!body.URL || !body.Title || !body.Summary) {
      return message.reply('big failure, please search for something that exists.');
    }
    const td = new Turndown();
    td.addRule('hyperlink', {
      filter: 'a',
      replacement: (text, node) => `[${text}](https://developer.mozilla.org${node.href})`
    });

    const summary = body.Summary.replace(
      /<code><strong>(.+)<\/strong><\/code>/g,
      '<strong><code>$1</code></strong>'
    );
    const embed = new MessageEmbed()
      .setTitle(body.Label)
      .setURL(MDN + body.URL)
      .setAuthor('MDN', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
      .setColor(COLOR)
      .setDescription(td.turndown(summary))
      .setFooter(`Tags: ${body.Tags.join(', ')}`);
    return message.channel.send({ embed });
  }
};
