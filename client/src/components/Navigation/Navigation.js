/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import { Emoji, Button, User } from '../index';
import userContext from '../../context/userContext';

function Navigation() {
  const { token } = useContext(userContext);
  return (
    <header className='navigation'>
      <h1 className='navigation__logo' role='img' aria-label='party'>
        <NavLink to='/'>
          <Emoji label='party'>🎉</Emoji> Events Booking
        </NavLink>
      </h1>
      <ul className='navigation__links'>
        {!token && (
          <Fragment>
            <li>
              <Button component={NavLink} variant='secondary' to='/register'>
                Register
              </Button>
            </li>
            <li>
              <Button component={NavLink} color='blue' to='/login'>
                Login
              </Button>
            </li>
          </Fragment>
        )}
        {token && (
          <Fragment>
            <li>
              <Button color='green'>CREATE NEW</Button>
            </li>
            <li>
              <User />
            </li>
          </Fragment>
        )}
      </ul>
    </header>
  );
}

export default Navigation;
