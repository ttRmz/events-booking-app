require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async args => {
    const verifyExist = await User.findOne({ email: args.UserInput.email });
    if (verifyExist) {
      throw new Error('User already exists.');
    }
    const hashedPAssword = await bcrypt.hash(args.UserInput.password, 12);
    const user = new User({
      email: args.UserInput.email,
      password: hashedPAssword
    });
    const res = await user.save();
    return { ...res._doc, password: null, id: res._id };
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Email or password is incorrect!');
    }
    const token = jwt.sign({ userId: user._id, email }, process.env.SECRET || 'secret', {
      expiresIn: '1h'
    });
    return {
      userId: user._id,
      token,
      tokenExpiration: 1
    };
  }
};
