module.exports = (client) => {
  client.on('message', (message) => {
    if (message.author.bot) return;

    if (message.content.match(new RegExp(`^.{0,5}((go+d ?)?nat+a?)(!|(<@)?${client.user.username}(>)?|alle|sammen|,| )*$`, 'i'))) {
      message.channel.send(`natta <@${message.author.username}>!`);
    }
  });
};
