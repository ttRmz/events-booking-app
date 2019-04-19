const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      required: true,
      type: String
    },
    password: {
      required: true,
      type: String,
      minlength: 8
    },
    pseudo: {
      required: true,
      type: String,
      minlength: 3,
      maxlength: 14
    },
    createdEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ]
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
