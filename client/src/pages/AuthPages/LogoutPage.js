import React, { useContext } from 'react';
import userContext from '../../context/userContext';
import { Redirect } from 'react-router-dom';

function LogoutPage() {
  useContext(userContext).logout();
  return <Redirect to='/login' />;
}

export default LogoutPage;
