/* eslint-disable no-restricted-globals */
import React, { useContext, useMemo, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { LoginPage, BookingsPage, EventsPage, RegisterPage, LogoutPage } from './pages';
import { Navigation, GuardedRoute, CreateEvent } from './components';
import userContext from './context/userContext';
import { useBoolean } from 'react-hanger';

function App() {
  const { token } = useContext(userContext);
  const isAuth = useMemo(() => token || localStorage.getItem('token'), [token, localStorage]);
  const create = useBoolean(false);
  useEffect(() => {
    create.setFalse();
  }, [window.location.href, history]);
  return (
    <BrowserRouter>
      <Navigation create={create} />
      <Switch>
        <Redirect from='/' to='/events' exact />
        <GuardedRoute test={!isAuth} redirectTo='/logout' path='/login' component={LoginPage} />
        <GuardedRoute test={!isAuth} redirectTo='/logout' path='/register' component={RegisterPage} />
        <Route path='/events' component={EventsPage} />
        <GuardedRoute test={isAuth} redirectTo='/login' path='/bookings' component={BookingsPage} />
        <Route path='/logout' component={LogoutPage} />
      </Switch>
      {create.value && <CreateEvent onClose={create.setFalse} />}
    </BrowserRouter>
  );
}

export default App;
