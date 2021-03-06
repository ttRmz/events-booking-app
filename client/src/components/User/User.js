/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import { Emoji, Spinner, UserMenu } from '../index';
import userContext from '../../context/userContext';
import { loader } from 'graphql.macro';
import { useBoolean } from 'react-hanger';
import { Redirect } from 'react-router-dom';
import './User.scss';

const ME = loader('../../graphql/queries/me.graphql');

function User() {
  const { username, avatar } = useContext(userContext);
  const menu = useBoolean(false);
  return (
    <Query query={ME}>
      {({ loading, data, error }) => {
        if (loading) return <Spinner />;
        if (error) return <Redirect to='/logout' />;
        if (data && data.me)
          return (
            <div className='user'>
              <div className='user__infos'>
                <h3>{username}</h3>
                <span>
                  <Emoji label='stars'>✨</Emoji>
                  {`${data.me.events.length} events`}
                </span>
              </div>
              <button onClick={menu.toggle}>
                <img src={avatar} alt='avatar' />
              </button>
              {menu.value && <UserMenu onClose={menu.toggle} />}
            </div>
          );
      }}
    </Query>
  );
}

export default User;
