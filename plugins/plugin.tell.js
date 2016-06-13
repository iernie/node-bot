const jsonfile = require('jsonfile');
const file = './reminders.json';

module.exports = (client) => {
  let reminders = [];
  jsonfile.readFile(file, (err, obj) => {
    if (!err) {
      reminders = obj;
    }
  });

  client.addListener('message', (from, to, message) => {
    if (message.match(/^!tell /)) {
      const matches = message.match(/^(\S+)\s(\S+)\s(.*)/);
      if (matches !== null) {
        const query = matches.splice(1);
        if (query !== null && query.length > 0 && query[1] !== null && query[1].trim() !== '' && query[2] !== null && query[2].trim() !== '') {
          reminders.push({
            from,
            channel: to,
            to: query[1].trim(),
            message: query[2].trim()
          });
          jsonfile.writeFileSync(file, reminders);
          client.say(to, `${from}, notert!`);
        }
      }
    }
  });

  client.addListener('join', (from, to) => {
    reminders = reminders.filter((reminder) => {
      if (reminder.to.toLowerCase() === to.toLowerCase() && reminder.channel === from) {
        client.say(from, `${reminder.to}: ${reminder.message} (${reminder.from})`);
        return false;
      }
      return true;
    });
    jsonfile.writeFileSync(file, reminders);
  });
};