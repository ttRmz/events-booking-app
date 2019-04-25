/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useContext } from 'react';
import userContext from '../context/userContext';
import { Emoji } from '../components';

function EventsPage(props) {
  const { username } = useContext(userContext);
  return (
    <h1
      style={{ marginTop: 32, display: 'inline-flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}
    >
      Hi {username || 'stranger'}!
      <Emoji label='rocket' style={{ marginLeft: 12 }}>
        🚀
      </Emoji>
    </h1>
  );
}

export default EventsPage;
