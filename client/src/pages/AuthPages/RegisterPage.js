/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from 'react';
import './Auth.scss';
import { Link } from 'react-router-dom';
import { Button, Emoji, Tick, Spinner } from '../../components';
import { Mutation } from 'react-apollo';
import { loader } from 'graphql.macro';
import { useInput } from 'react-hanger';

const REGISTER = loader('../../graphql/mutations/register.graphql');

function RegisterPage() {
  return (
    <section className='register'>
      <div className='register__container'>
        <h2>
          Welcome to <b>Event Booking</b> <Emoji label='hello'> 👋</Emoji>.
        </h2>
        <p>Please, create your account to join the community.</p>
        <Mutation mutation={REGISTER}>
          {(createUser, { loading, data, error }) => {
            return !data ? (
              <RegisterForm createUser={createUser} loading={loading} gqlError={error} />
            ) : (
              <h3 className='registered'>
                Hi {data.createUser.pseudo}! <Tick />
              </h3>
            );
          }}
        </Mutation>
      </div>
      <div className='register__container register__img' style={{ backgroundImage: 'url(./assets/images/sky.jpg)' }} />
    </section>
  );
}

function RegisterForm({ createUser, loading, gqlError }) {
  const username = useInput('');
  const email = useInput('');
  const password = useInput('');
  const verifyPassword = useInput('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (gqlError) {
      const newError = gqlError.graphQLErrors.map(({ message }) => message).join('');
      setError(newError);
    }
  }, [gqlError]);

  const handleErrors = () => {
    if (email.value && username.value && password.value) {
      if (!verifyPassword.value) {
        setError('You must verify your password');
        return true;
      }
      if (password.value !== verifyPassword.value) {
        setError('The two passwords do not match');
        return true;
      }
      return false;
    } else if (!email.value || !username.value) {
      setError(`Your ${!username.value ? 'username' : 'email address'} is required`);
      return true;
    }
    setError('You must enter your password');
    return true;
  };

  const handleRegister = evt => {
    evt.preventDefault();
    if (!handleErrors()) {
      return createUser({
        variables: { email: email.value, pseudo: username.value, password: password.value }
      });
    }
  };

  return (
    <form className='form' onSubmit={handleRegister}>
      <div className='form__container'>
        <div className='form__control'>
          <label htmlFor='username'>Choose an username</label>
          <input placeholder='username' value={username.value} onChange={username.onChange} type='text' id='username' />
        </div>
        <div className='form__control'>
          <label htmlFor='email'>Email address</label>
          <input placeholder='email' type='email' id='email' value={email.value} onChange={email.onChange} />
        </div>
        <div className='form__control'>
          <label htmlFor='password'>Password</label>
          <input
            placeholder='password'
            type='password'
            id='password'
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <div className='form__control'>
          <label htmlFor='verify-password'>Verify your assword</label>
          <input
            placeholder='verify password'
            type='password'
            id='verify-password'
            value={verifyPassword.value}
            onChange={verifyPassword.onChange}
          />
        </div>
      </div>
      {error && <span className='form__error'>{error}</span>}
      <div className='form__action'>
        <Button style={{ width: 98 }} disabled={loading} type='submit'>
          {loading ? <Spinner /> : 'Register'}
        </Button>
      </div>
      <span className='redirect'>
        Already have an account ? <Link to='/auth'>Click here</Link> to sign in.
      </span>
    </form>
  );
}

export default RegisterPage;
