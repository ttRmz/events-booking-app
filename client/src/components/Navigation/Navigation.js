/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import { Emoji } from '../index';

function Navigation() {
  return (
    <header className='navigation'>
      <h1 className='navigation__logo' role='img' aria-label='party'>
        <Emoji label='party'>🎉</Emoji> Events Booking
      </h1>
      <ul className='navigation__links'>
        <li>
          <NavLink activeClassName='link--active' to='/events'>
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='link--active' to='/bookings'>
            Bookings
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='link--active' to='/auth'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='link--active' to='/register'>
            Register
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Navigation;
