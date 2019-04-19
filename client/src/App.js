import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { LoginPage, BookingsPage, EventsPage, RegisterPage } from './pages';
import { Navigation } from './components';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Redirect from='/' to='/auth' exact />
        <Route path='/auth' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/events' component={EventsPage} />
        <Route path='/bookings' component={BookingsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
