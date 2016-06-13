const irc = require('irc');
const config = require('./config');

const client = new irc.Client(config.server, config.nick, config.options);

config.plugins.forEach((plugin) => {
  require(`./plugins/plugin.${plugin.name}`)(client, plugin);
});

client.addListener('error', (message) => {
  console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});