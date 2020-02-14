const Event = require("../../models/event");
const User = require("../../models/user");

const { formatEvent } = require("./merge");

module.exports = {
  event: async (args, req) => {
    try {
      const event = await Event.findById(args.id);
      return formatEvent(event);
    } catch (err) {
      throw err;
    }
  },

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
      throw new Error("Unauthenticated!");
    }

    const event = new Event({
      title: args.EventInput.title,
      description: args.EventInput.description,
      price: args.EventInput.price,
      date: new Date(args.EventInput.date),
      time: args.EventInput.time,
      creator: req.userId
    });

    try {
      const res = await event.save();
      const createdEvent = formatEvent(res);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found.");
      }

      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },

  removeEvent: async ({ id }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found.");
      }

      const filteredEvents = creator.createdEvents.filter(eventID => {
        return eventID.toString() !== id;
      });

      creator.createdEvents = filteredEvents;
      creator.save();
    } catch (err) {
      throw err;
    }

    try {
      const event = await Event.findById(id);

      if (!event) {
        throw new Error("Event not found");
      }

      await Event.findByIdAndDelete(id);
      return formatEvent(event);
    } catch (err) {
      return err;
    }
  }
};
