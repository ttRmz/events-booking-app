import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { LoginPage, BookingsPage, EventsPage, RegisterPage, LogoutPage } from './pages';
import { Navigation } from './components';
import { UserProvider } from './context/userContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navigation />
        <Switch>
          <Redirect from='/' to='/events' exact />
          <Route path='/auth' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/events' component={EventsPage} />
          <Route path='/bookings' component={BookingsPage} />
          <Route path='/logout' component={LogoutPage} />
        </Switch>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
