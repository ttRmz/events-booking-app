const Event = require('../../models/event');
const User = require('../../models/user');

const { formatEvent } = require('./merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => formatEvent(event));
    } catch (err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.EventInput.title,
      description: args.EventInput.description,
      price: args.EventInput.price,
      date: new Date(args.EventInput.date),
      creator: '5cb719721b51bb29c2c7bdbf'
    });
    let createdEvent;
    try {
      const res = await event.save();
      createdEvent = formatEvent(res);
      const creator = await User.findById('5cb719721b51bb29c2c7bdbf');
      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
