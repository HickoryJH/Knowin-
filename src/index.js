const { Client } = require('discord.js');
const { createServer } = require('http');
const read = require('fs-readdir-recursive');
const { join } = require('path');

const prefix = process.env.PREFIX.toLowerCase();

const client = new Client();
client.commands = [];

for (const cmd of read(join(__dirname, 'commands'))) {
  const pull = require(join(__dirname, 'commands', cmd));
  if (!pull.usage) pull.usage = '';
  if (!pull.description) pull.description = 'No description.';
  client.commands.push(pull);
}

client.on('ready', () => {
  client.user.setActivity(`with docs | ${prefix}help`);
  console.log(`${client.user.tag} is now online!`);
});

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])) {
    return false;
  }
  if (!message.content.toLowerCase().startsWith(prefix)) {
    return false;
  }
  const args = message.content.slice(prefix.length).split(/\s+/);
  const alias = args.shift().toLowerCase();

  const command = client.commands.find(c => c.aliases.includes(alias));
  if (!command) {
    return false;
  }

  try {
    command.exec(message, args);
  } catch (e) {
    console.error(e);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(process.env.TOKEN);

const server = createServer((req, res) => {
  res.writeHead(302, { Location: 'https://glitch.com/@Papaia' });
  res.end();
});

const listener = server.listen(process.env.PORT, () =>
  console.log(`Your app is listening on port ${listener.address().port}`)
);
