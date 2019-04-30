require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { getUser } = require('./merge');

module.exports = {
  me: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    return await getUser(req.userId);
  },
  createUser: async args => {
    const verifyEmail = await User.findOne({ email: args.UserInput.email });
    const verifyPseudo = await User.findOne({ pseudo: args.UserInput.pseudo });
    if (verifyEmail) {
      throw new Error('User already exists for this email address.');
    }
    if (verifyPseudo) {
      throw new Error('This pseudo is already taken.');
    }
    const hashedPAssword = await bcrypt.hash(args.UserInput.password, 12);
    const user = new User({
      pseudo: args.UserInput.pseudo,
      email: args.UserInput.email,
      password: hashedPAssword
    });
    const res = await user.save();
    return { ...res._doc, password: null, id: res._id };
  },
  login: async ({ pseudo, password }) => {
    const user = await User.findOne({ pseudo });
    const isEqual = await bcrypt.compare(password, user.password);
    if (!user || !isEqual) {
      throw new Error('Pseudo or password is incorrect!');
    }
    const token = jwt.sign({ userId: user._id, pseudo }, process.env.SECRET || 'secret', {
      expiresIn: '1h'
    });
    return {
      pseudo,
      userId: user._id,
      token,
      tokenExpiration: 1
    };
  }
};
