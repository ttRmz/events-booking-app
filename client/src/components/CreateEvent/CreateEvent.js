import React, { useEffect, useState } from 'react';
import { Button, Toggle, Spinner, Input } from '../../components';
import { Mutation } from 'react-apollo';
import { loader } from 'graphql.macro';
import { useInput, useBoolean } from 'react-hanger';
import './CreateEvent.scss';

const CREATE_EVENT = loader('../../graphql/mutations/createEvent.graphql');

function CreateEvent({ onClose, onSubmit, ...rest }) {
  return (
    <div onAnimationEnd={onClose} className='create' {...rest}>
      <h2 className='create__title'>Create new event</h2>
      <Mutation mutation={CREATE_EVENT}>
        {(createEvent, { loading, data, error }) => {
          if (data) onClose();
          return <CreateForm createEvent={createEvent} loading={loading} gqlError={error} onClose={onClose} />;
        }}
      </Mutation>
    </div>
  );
}

function CreateForm({ createEvent, gqlError, loading, onClose }) {
  const title = useInput('');
  const description = useInput('');
  const date = useInput('');
  const price = useInput('0');
  const [error, setError] = useState('');
  const paid = useBoolean(true);

  useEffect(() => {
    if (gqlError) {
      const newError = gqlError.graphQLErrors.map(({ message }) => message).join('');
      setError(newError);
    }
  }, [gqlError]);

  useEffect(() => {
    if (!paid.value && Number(price.value) > 0) {
      price.setValue('0');
    }
  }, [paid.value]);

  const isValidDate = React.useMemo(() => Date.parse(date.value), [date.value]);
  const isValidPrice = React.useMemo(() => Number(price.value) > 0, [price.value]);

  const handleVerifyErrors = () => {
    let err = false;
    if (paid.value && !isValidPrice) {
      setError('You must set a price for your event.');
      err = true;
    }
    if (!isValidDate) {
      setError('You must set a date for your event.');
      err = true;
    }
    if (!description.value) {
      setError('You must add a short description of your event.');
      err = true;
    }
    if (!title.value) {
      setError('Please define the title of your event.');
      err = true;
    }
    return err;
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    if (!handleVerifyErrors()) {
      createEvent({
        variables: {
          title: title.value,
          description: description.value,
          date: new Date(date.value),
          price: Number(price.value)
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='create__form'>
      <div className='create__toggle'>
        <Toggle value={paid.value} onChange={paid.toggle} />
        <span>Free</span>
      </div>
      <Input.Container>
        <Input
          validated={title.value.length > 5}
          value={title.value}
          onChange={title.onChange}
          label='Title'
          placeholder='title'
          id='create-title'
        />
        <Input
          validated={description.value.length > 11}
          value={description.value}
          onChange={description.onChange}
          label='Desctiption'
          placeholder='decription'
          id='create-desc'
        />
        <Input
          validated={isValidDate}
          value={date.value}
          onChange={date.onChange}
          label='Date'
          type='date'
          placeholder='decription'
          id='create-date'
        />
        <Input
          disabled={!paid.value}
          validated={isValidPrice}
          value={price.value}
          onChange={price.onChange}
          label='Price (€)'
          type='number'
          placeholder='price (€)'
          id='create-price'
        />
      </Input.Container>
      {error && <span className='create__error'>{error}</span>}
      <div className='create__action'>
        <Button color={'green'} style={{ width: 98, marginRight: 12 }} disabled={loading} type='submit'>
          {loading ? <Spinner light /> : 'Create'}
        </Button>
        <Button color={'dark'} variant='secondary' style={{ width: 98 }} onClick={onClose} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default CreateEvent;
