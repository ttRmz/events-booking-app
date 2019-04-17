const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { formatBooking, formatEvent } = require('./merge');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const bookings = await Booking.find();
    return bookings.map(booking => {
      return formatBooking(booking);
    });
  },
  bookEvent: async ({ eventID }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const verifiyBooking = await Booking.findOne({ $and: [{ user: req.userId }, { event: eventID }] });
    if (verifiyBooking) {
      throw new Error('User has already booked for this event.');
    }
    const event = await Event.findById(eventID);
    const booking = new Booking({
      user: req.userId,
      event
    });
    const res = await booking.save();
    return formatBooking(res);
  },
  cancelBooking: async ({ bookingID }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const booking = await Booking.findById(bookingID).populate('event');
    const event = formatEvent(booking.event);
    await Booking.findByIdAndDelete(bookingID);
    return event;
  }
};
