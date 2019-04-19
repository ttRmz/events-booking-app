import React from 'react';
import './Button.scss';
import classNames from 'classnames';

function Button({ variant, color, className, ...rest }) {
  const btnClass = classNames('btn', className, `btn--${variant}--${color}`);
  return <button className={btnClass} {...rest} />;
}

Button.defaultProps = {
  variant: 'primary',
  color: 'dark'
};

export default Button;
