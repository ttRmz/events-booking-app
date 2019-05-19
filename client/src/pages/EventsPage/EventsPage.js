/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Spinner, Event } from '../../components';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import './EventsPage.scss';

const EVENTS = loader('../../graphql/queries/events.graphql');

function EventsPage(props) {
  return (
    <Query query={EVENTS}>
      {({ data, loading }) => {
        if (loading) return <Spinner className='events__loading' size='large' />;
        if (data)
          return (
            <div className='events__container'>
              {data.events.map(event => (
                <Event key={event.id} {...event} />
              ))}
            </div>
          );
      }}
    </Query>
  );
}

export default EventsPage;
