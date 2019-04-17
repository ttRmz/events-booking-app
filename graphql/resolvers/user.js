const bcrypt = require('bcryptjs');
const User = require('../../models/user');

module.exports = {
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
    const res = await user.save();
    console.log('User created');
    return { ...res._doc, password: null, id: res._id };
  }
};
