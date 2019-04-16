const bcrypt = require('bcryptjs');

const Event = require('../../models/events');
const User = require('../../models/users');
const Booking = require('../../models/booking');

const getEvents = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map(event => {
      return {
        ...event._doc,
        id: event._id,
        date: new Date(event._doc.date).toISOString(),
        creator: getUser.bind(this, event._doc.creator)
      };
    });
    return events;
  } catch (err) {
    console.log('Event not found');
    throw err;
  }
};

getEvent = async eventId => {
  try {
    const res = await Event.findById(eventId);
    return { ...res._doc, id: res._id, creator: getUser.bind(this, res._doc.creator) };
  } catch (err) {
    console.log('Event not found');
    throw err;
  }
};

const getUser = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user.id,
      password: null,
      createdEvents: getEvents.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    console.log('User not found');
    throw err;
  }
};

module.exports = {
  bookings: async () => {
    const res = await Booking.find();
    return res.map(booking => ({
      ...booking._doc,
      id: booking._id,
      user: getUser.bind(this, booking._doc.user),
      event: getEvent.bind(this, booking._doc.event)
    }));
  },
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: getUser.bind(this, event._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = await new Event({
      title: args.EventInput.title,
      description: args.EventInput.description,
      price: args.EventInput.price,
      date: new Date(args.EventInput.date),
      creator: '5cac5d19838ec0857d888c54' // TODO: id from session
    }).save();
    const creator = await User.findById('5cac5d19838ec0857d888c54'); // TODO: id from session
    creator.createdEvents.push(event);
    creator.save();
    console.log('Event created', event);
    return {
      ...event._doc,
      id: event._doc._id,
      date: new Date(event._doc.date).toISOString(),
      creator: await getUser('5cac5d19838ec0857d888c54') // TODO: id from session
    };
  },
  createUser: async args => {
    const verifyExist = await User.findOne({ email: args.UserInput.email });
    if (verifyExist) {
      console.log('User already exists');
      throw new Error('user already exists');
    }
    const hashedPAssword = await bcrypt.hash(args.UserInput.password, 12);
    const user = new User({
      email: args.UserInput.email,
      password: hashedPAssword
    });
    const { password, ...res } = await user.save();
    console.log('User created', { ...res });
    return { ...res };
  },
  bookEvent: async ({ eventID }) => {
    const event = await Event.findById(eventID);
    const booking = new Booking({
      user: '5cac5d19838ec0857d888c54', // TODO: id from session
      event
    });
    const res = await booking.save();
    return {
      ...res._doc,
      id: res._id,
      user: getUser.bind(this, res._doc.user),
      event: getEvent.bind(this, res._doc.event)
    };
  },
  cancelBooking: async ({ bookingID }) => {
    const booking = await Booking.findById(bookingID).populate('event');
    const event = {
      ...booking.event._doc,
      id: booking.event._id,
      creator: getUser.bind(this, booking.event._doc.creator)
    };
    await Booking.findByIdAndDelete(bookingID);
    return event;
  }
};
