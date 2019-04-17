require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphqlSchemas = require('./graphql/schemas');
const graphqlResolvers = require('./graphql/resolvers');
const isAuth = require('./middleware/auth');

const app = express();

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

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchemas,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);
