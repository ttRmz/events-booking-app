import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './UserMenu.scss';

function UserMenu({ onClose, ...rest }) {
  return (
    <Fragment>
      <div className='user__menu--overlay' onClick={onClose} />
      <ul className='user__menu' onClick={onClose} {...rest}>
        <li className='user__menu--item'>
          <NavLink to='/bookings'>My bookings</NavLink>
        </li>
        <li className='user__menu--item'>
          <NavLink to='/logout'>Logout</NavLink>
        </li>
      </ul>
    </Fragment>
  );
}

export default UserMenu;
