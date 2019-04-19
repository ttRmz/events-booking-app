import React from 'react';
import classNames from 'classnames';
import './Tick.scss';

function Tick({ className, ...rest }) {
  const tickClass = classNames(className, 'checkmark');
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52' className={tickClass} {...rest}>
      <circle className='checkmark__circle' cx='26' cy='26' r='25' fill='none' />
      <path className='checkmark__check' fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8' />
    </svg>
  );
}

export default Tick;
