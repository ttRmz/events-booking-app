const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const getEvents = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => formatEvent(event));
  } catch (err) {
    console.log("Event not found.");
    throw err;
  }
};

const getEvent = async eventId => {
  try {
    const res = await Event.findById(eventId);
    return { ...res._doc, id: res._id, creator: getUser(res._doc.creator) };
  } catch (err) {
    console.log("Event not found.");
    throw err;
  }
};

const getUser = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user._id,
      password: null,
      createdEvents: getEvents(user._doc.createdEvents)
    };
  } catch (err) {
    console.log("User not found.");
    throw err;
  }
};

const formatEvent = event => {
  return {
    ...event._doc,
    id: event._id,
    date: dateToString(event._doc.date),
    creator: getUser(event.creator)
  };
};

const formatBooking = booking => {
  return {
    ...booking._doc,
    id: booking._id,
    user: getUser(booking._doc.user),
    event: getEvent(booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

exports.formatEvent = formatEvent;
exports.formatBooking = formatBooking;

exports.getUser = getUser;
exports.getEvents = getEvents;
exports.getEvent = getEvent;
