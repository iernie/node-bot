require('dotenv').config();

global.Parse = require('parse/node');
const Discord = require('discord.js');

const plugins = require('./plugins');

const client = new Discord.Client();
Parse.initialize(process.env.parse_app_id);
Parse.serverURL = process.env.parse_server_url;

client.on('ready', () => {
  console.log('Bip bop, I am ready!');
  client.user.setUsername(process.env.username || "linkbot");
});

client.on('error', (error) => {
  console.warn(error);
});

client.setMaxListeners(0);

plugins.forEach(plugin => plugin(client));

client.login(process.env.token);
