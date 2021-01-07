module.exports = message => message.guild.roles.cache.filter(r => r.name.startsWith('#'));
