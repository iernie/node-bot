const Mute = Parse.Object.extend('Mute');

module.exports = (client) => {
  client.on('message', (message) => {
    if (message.author.bot) return;

    const matches = message.content.match(/!mute #?(\S+)/i);
    if (matches) {
      const channel = client.channels.find('name', matches[1]);
      if (channel) {
        const muteObject = new Mute();
        muteObject.set('channel', channel.id);
        muteObject.save();
      }
    }
  });
};
