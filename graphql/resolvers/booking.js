const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { formatBooking, formatEvent } = require('./merge');

module.exports = {
  bookings: async () => {
    const bookings = await Booking.find();
    return bookings.map(booking => {
      return formatBooking(booking);
    });
  },
  bookEvent: async ({ eventID }) => {
    const verifiyBooking = await Booking.findOne({ $and: [{ user: '5cb719721b51bb29c2c7bdbf' }, { event: eventID }] });
    if (verifiyBooking) {
      throw new Error('User has already booked for this event');
    }
    const event = await Event.findById(eventID);
    const booking = new Booking({
      user: '5cb719721b51bb29c2c7bdbf', // TODO: id from session
      event
    });
    const res = await booking.save();
    return formatBooking(res);
  },
  cancelBooking: async ({ bookingID }) => {
    const booking = await Booking.findById(bookingID).populate('event');
    const event = formatEvent(booking.event);
    await Booking.findByIdAndDelete(bookingID);
    return event;
  }
};
