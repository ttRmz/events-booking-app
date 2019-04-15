const bcrypt = require('bcryptjs');

const Event = require('../../models/events');
const User = require('../../models/users');

const getEvent = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map(event => {
      return {
        ...event._doc,
        id: event.id,
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

const getUser = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user.id,
      password: null,
      createdEvents: getEvent.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    console.log('User not found');
    throw err;
  }
};

module.exports = {
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
  }
};
