const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const trimArray = arr => {
  if (arr.length > 10) {
    const len = arr.length - 10;
    arr = arr.slice(0, 10);
    arr.push(`${len} more...`);
  }
  return arr;
};

module.exports = {
  aliases: ['npm', 'npmpackage', 'package'],
  usage: '<package>',
  description: 'Shows information about an NPM package.',
  async exec(message, [pkg]) {
    if (!pkg) {
      return message.reply('please provide a package.');
    }
    pkg = encodeURIComponent(pkg);
    const res = await fetch(`https://registry.npmjs.com/${pkg}`);

    if (res.status === 404) {
      return message.reply("that package wasn't found.");
    }
    const body = await res.json();

    if (body.time.unpublished) {
      return message.channel.send(
        'Whoever was the Commander of this package decided to unpublish it, what a fool.'
      );
    }

    const version = body.versions[body['dist-tags'].latest];
    const maintainers = trimArray(body.maintainers.map(user => user.name));
    const dependencies = version.dependencies ? trimArray(Object.keys(version.dependencies)) : null;

    const embed = new MessageEmbed()
      .setColor('#CB0000')
      .setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
      .setTitle(body.name)
      .setURL(`https://www.npmjs.com/package/${pkg}`)
      .setDescription(body.description || 'No description.')
      .addField('Version', body['dist-tags'].latest, true)
      .addField('License', body.license || 'None', true)
      .addField('Author', body.author ? body.author.name : '???', true)
      .addField('Creation Date', moment.utc(body.time.created).format('YYYY/MM/DD hh:mm:ss'), true)
      .addField(
        'Modification Date',
        moment.utc(body.time.modified).format('YYYY/MM/DD hh:mm:ss'),
        true
      )
      .addField('Main File', version.main || 'index.js', true)
      .addField(
        'Dependencies',
        dependencies && dependencies.length ? dependencies.join(', ') : 'None'
      )
      .addField('Maintainers', maintainers.join(', '));

    return message.channel.send({ embed });
  }
};
