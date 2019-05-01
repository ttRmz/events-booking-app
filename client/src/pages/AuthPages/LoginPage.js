/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';
import { Button, Emoji, Spinner } from '../../components';
import { Mutation } from 'react-apollo';
import { loader } from 'graphql.macro';
import { useInput } from 'react-hanger';
import userContext from '../../context/userContext';
import { Redirect } from 'react-router-dom';

const LOGIN = loader('../../graphql/mutations/login.graphql');

function LoginPage() {
  const { login: handleLogin } = useContext(userContext);
  return (
    <section className='login'>
      <div className='login__container'>
        <h2>
          Welcome to <b>Event Booking</b> <Emoji label='hello'> 👋</Emoji>.
        </h2>
        <p>Please, login to your account.</p>
        <Mutation mutation={LOGIN}>
          {(login, { loading, data, error }) => {
            if (data) {
              handleLogin(data);
              return <Redirect to='/events' />;
            }
            return <LoginForm login={login} loading={loading} gqlError={error} />;
          }}
        </Mutation>
      </div>
      <div className='login__container login__img' style={{ backgroundImage: 'url(./assets/images/conf.jpg)' }} />
    </section>
  );
}

function LoginForm({ login, loading, gqlError }) {
  const username = useInput('');
  const password = useInput('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (gqlError) {
      return setError('Pseudo or password is incorrect!');
    }
    return setError('');
  }, [gqlError]);

  const handleErrors = () => {
    if (!password.value && !username.value) {
      setError('Username and password are required.');
      return true;
    } else if (!password.value || !username.value) {
      setError(`${!password.value ? 'Password' : 'Username'} is required.`);
      return true;
    }
    return false;
  };

  const handleLogin = evt => {
    evt.preventDefault();
    if (!handleErrors()) {
      return login({
        variables: { pseudo: username.value, password: password.value }
      });
    }
  };

  return (
    <form className='form' onSubmit={handleLogin}>
      <div className='form__container'>
        <div className='form__control'>
          <label htmlFor='username'>Username</label>
          <input value={username.value} onChange={username.onChange} placeholder='username' type='text' id='username' />
        </div>
        <div className='form__control'>
          <label htmlFor='password'>Password</label>
          <input
            value={password.value}
            onChange={password.onChange}
            placeholder='password'
            type='password'
            id='password'
          />
        </div>
      </div>
      {error && <span className='form__error'>{error}</span>}
      <div className='form__action'>
        <Button color={'green'} style={{ width: 98 }} disabled={loading} type='submit'>
          {loading ? <Spinner light /> : 'Login'}
        </Button>
      </div>
      <span className='redirect'>
        Don't have an account ? <Link to='/register'>Click here</Link> to create yours.
      </span>
    </form>
  );
}

export default LoginPage;
