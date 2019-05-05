import React from 'react';
import classNames from 'classnames';
import './Toggle.scss';

function Toggle({ onChange, className, ...rest }) {
  const toggleClass = classNames('toggle', className);
  return (
    <div className={toggleClass}>
      <input type='checkbox' className={'toggle__input'} onChange={onChange} {...rest} />
      <label className={'toggle__label'} />
    </div>
  );
}

export default Toggle;
