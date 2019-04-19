import React from 'react';
import classNames from 'classnames';
import './Spinner.scss';

const Circle = () => (
  <svg viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
    <circle fill='none' strokeWidth='8' strokeLinecap='round' cx='33' cy='33' r='28' />
  </svg>
);

const Spinner = ({ size = 'small', light, className, ...rest }) => {
  const spinnerClass = classNames(`spinner--${size}`, 'spinner', className, {
    'spinner--light': light
  });
  return (
    <div className={spinnerClass} {...rest}>
      <Circle />
    </div>
  );
};

export default Spinner;
