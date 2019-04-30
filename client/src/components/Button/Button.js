import React from 'react';
import './Button.scss';
import classNames from 'classnames';

function Button({ variant, color, className, component, href, ...rest }) {
  const Component = component ? component : href ? 'a' : 'button';
  const btnClass = classNames('btn', className, `btn--${variant}--${color}`);
  return <Component href={href} className={btnClass} {...rest} />;
}

Button.defaultProps = {
  variant: 'primary',
  color: 'dark'
};

export default Button;
