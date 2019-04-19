/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './Auth.scss';
import { Link } from 'react-router-dom';
import { Button, Emoji } from '../../components';

function RegisterPage() {
  return (
    <section className='register'>
      <div className='register__container'>
        <h2>
          Wellcome to <b>Event Booking</b> <Emoji label='hello'> 👋</Emoji>.
        </h2>
        <p>Please, create your account to join the community.</p>
        <form className='form'>
          <div className='form__container'>
            <div className='form__control'>
              <label htmlFor='email'>Email address</label>
              <input placeholder='email' type='email' id='email' />
            </div>
            <div className='form__control'>
              <label htmlFor='password'>Password</label>
              <input placeholder='password' type='password' id='password' />
            </div>
            <div className='form__control'>
              <label htmlFor='verify-password'>Verify your assword</label>
              <input placeholder='verify password' type='password' id='verify-password' />
            </div>
          </div>
          <div className='form__action'>
            <Button type='submit'>Register</Button>
          </div>
        </form>
        <span className='redirect'>
          Already have an account ? <Link to='/auth'>Click here</Link> to sign in.
        </span>
      </div>
      <div className='register__container register__img' style={{ backgroundImage: 'url(./assets/images/sky.jpg)' }} />
    </section>
  );
}

export default RegisterPage;
