import React from 'react';

function Emoji({ label, ...rest }) {
  return <span role='img' aria-label={label || ''} aria-hidden={!label} {...rest} />;
}

export default Emoji;
