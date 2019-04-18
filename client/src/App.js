import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { LoginPage, BookingsPage, EventsPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from='/' to='/auth' exact />
        <Route path='/auth' component={LoginPage} />
        <Route path='/events' component={EventsPage} />
        <Route path='/bookings' component={BookingsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
