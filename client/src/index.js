import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import userContext, { UserProvider } from './context/userContext';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authMiddleware = token =>
  new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });

    return forward(operation);
  });

const client = token =>
  new ApolloClient({
    link: concat(authMiddleware(token), httpLink),
    cache: new InMemoryCache()
  });

function Root() {
  const { token } = React.useContext(userContext);
  return (
    <ApolloProvider client={client(token)}>
      <App />
    </ApolloProvider>
  );
}

ReactDOM.render(
  <UserProvider>
    <Root />
  </UserProvider>,
  document.getElementById('root')
);
