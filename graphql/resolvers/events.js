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
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const event = new Event({
      title: args.EventInput.title,
      description: args.EventInput.description,
      price: args.EventInput.price,
      date: new Date(args.EventInput.date),
      time: args.EventInput.time,
      creator: req.userId
    });
    let createdEvent;
    try {
      const res = await event.save();
      createdEvent = formatEvent(res);
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  }
};
