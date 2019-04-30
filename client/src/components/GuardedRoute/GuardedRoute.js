import React from 'react';
import { Redirect, Route } from 'react-router';

function GuardedRoute({ test, component: Component, render, redirectTo, ...routeProps }) {
  return (
    <Route
      {...routeProps}
      render={props => {
        if (!test) {
          if (typeof redirectTo === 'string') {
            redirectTo = { pathname: redirectTo };
          }

          return (
            <Redirect
              to={{
                ...redirectTo,
                state: { from: props.location }
              }}
            />
          );
        }

        if (Component) {
          return <Component {...props} />;
        }

        if (render) {
          return render(props);
        }

        return null;
      }}
    />
  );
}

export default GuardedRoute;
