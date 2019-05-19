import React from 'react';
import './Event.scss';
import moment from 'moment';
import classNames from 'classnames';

function Event({ price, date, title, time, description, creator }) {
  const [, day] = moment(date)
    .locale('fr')
    .format('l')
    .split('/');

  const month = moment(date)
    .locale('fr')
    .format('MMM');

  const priceClass = React.useMemo(
    () =>
      classNames('event__price', {
        'event__price--paid': !!price,
        'event__price--free': !price
      }),
    [price]
  );

  const priceRef = React.useRef(null);
  const [titleStyle, setTitleStyle] = React.useState(null);

  React.useEffect(
    () =>
      setTitleStyle({
        maxWidth: `calc(100% - ${priceRef.current ? priceRef.current.clientWidth + 8 : 68}px)`
      }),
    [price, priceRef]
  );

  return (
    <div className='event'>
      <div className='event__date'>
        <span className='event__date--day'>{day}</span>
        <span className='event__date--month'>{month}</span>
      </div>
      <div className='event__infos'>
        <h3 className='event__title' style={titleStyle}>
          {title}
        </h3>
        <div ref={priceRef} className={priceClass}>
          {price ? `${price}€` : 'Free'}
        </div>
        <p className='event__time'>{time.replace(':', 'h').replace('h00', 'h')}</p>
        <p className='event__description'>{description}</p>
        <p className='event__creator'>Created by {creator.pseudo}</p>
      </div>
    </div>
  );
}

export default Event;
