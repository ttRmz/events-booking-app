import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { LoginPage, BookingsPage, EventsPage, RegisterPage, LogoutPage } from './pages';
import { Navigation, GuardedRoute } from './components';
import userContext from './context/userContext';

function App() {
  const { token } = useContext(userContext);
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Redirect from='/' to='/events' exact />
        <GuardedRoute test={!token} redirectTo='/logout' path='/login' component={LoginPage} />
        <GuardedRoute test={!token} redirectTo='/logout' path='/register' component={RegisterPage} />
        <Route path='/events' component={EventsPage} />
        <GuardedRoute test={token} redirectTo='/login' path='/bookings' component={BookingsPage} />
        <Route path='/logout' component={LogoutPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
