/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';
import { Button, Emoji } from '../../components';

function LoginPage() {
  return (
    <section className='login'>
      <div className='login__container'>
        <h2>
          Wellcome to <b>Event Booking</b> <Emoji label='hello'> 👋</Emoji>.
        </h2>
        <p>Please, login to your account.</p>
        <form className='form'>
          <div className='form__container'>
            <div className='form__control'>
              <label htmlFor='username'>Username</label>
              <input placeholder='username' type='text' id='username' />
            </div>
            <div className='form__control'>
              <label htmlFor='password'>Password</label>
              <input placeholder='password' type='password' id='password' />
            </div>
          </div>
          <div className='form__action'>
            <Button type='submit'>Login</Button>
          </div>
        </form>
        <span className='redirect'>
          Don't have an account ? <Link to='/register'>Click here</Link> to create yours.
        </span>
      </div>
      <div className='login__container login__img' style={{ backgroundImage: 'url(./assets/images/colors.jpg)' }} />
    </section>
  );
}

export default LoginPage;
