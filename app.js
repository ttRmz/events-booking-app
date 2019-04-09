require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/events');
const User = require('./models/users');
const app = express();

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

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PWD}@event-booking-a01r1.mongodb.net/${
      process.env.MONGO_NAMESPACE
    }?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected ✅');
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
    scalar Date

    type Event {
      id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
      createdAt: Date!
      updatedAt: Date!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type Query {
      events: [Event!]!
    }

    type User {
      id: ID!
      email: String!
      password: String
      createdEvents: [Event!]
      createdAt: Date!
      updatedAt: Date!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type Mutation {
      createEvent(EventInput: EventInput!): Event
      createUser(UserInput: UserInput!): User
    }

    schema {
      query: Query
      mutation: Mutation
    }
    `),
    rootValue: {
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
    },
    graphiql: true
  })
);
