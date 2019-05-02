import React from 'react';
import classNames from 'classnames';
import './Input.scss';

function Input({ label, validated, id, placeholder, ...rest }) {
  const inputClass = classNames('input', {
    'input--validated': validated
  });
  return (
    <div className={inputClass}>
      <label className='input__label' htmlFor={id}>
        {label}
      </label>
      <input placeholder={placeholder} id={id} {...rest} />
    </div>
  );
}

function Container({ className, ...rest }) {
  const groupClass = classNames('input--container', className);
  return <div className={groupClass} {...rest} />;
}

Input.Container = Container;

export default Input;
