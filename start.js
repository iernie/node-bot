require('dotenv').config();

const Discord = require('discord.js');

const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId
};

firebase.initializeApp(firebaseConfig);

firebase.auth().signInWithEmailAndPassword(process.env.email, process.env.password)
  .then(() => {
    console.log('Logged into firebase');
  })
  .catch((error) => {
    console.log(error);
  });

const plugins = require('./plugins');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Bip bop, I am ready!');
});

client.on('error', (error) => {
  console.warn(error);
});

client.setMaxListeners(0);

plugins.forEach((plugin) => plugin(client));

client.login(process.env.token);
