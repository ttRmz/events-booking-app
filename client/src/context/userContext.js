/* eslint-disable no-restricted-globals */
import React, { createContext, useState, useEffect } from 'react';

const userContext = createContext({
  login: () => {},
  logout: () => {},
  username: null,
  userId: null,
  token: null,
  avatar: null
});

export function UserProvider({ value, ...rest }) {
  const id = localStorage.getItem('userId');
  const tk = localStorage.getItem('token');
  const usr = localStorage.getItem('username');
  const [user, setUser] = useState({ userId: null, token: null, username: null, avatar: null });
  const getAvatar = id => `https://api.adorable.io/avatars/64/${id}`;
  useEffect(() => {
    if (!tk && user.token) {
      handleStoreUser(user);
    }
  }, [user]);
  useEffect(() => {
    if (tk && !user.token) {
      setUser({ userId: id, token: tk, username: usr, avatar: getAvatar(id) });
    }
  }, []);
  const handleLogin = ({ login }) => {
    const { userId, token, pseudo } = login;
    return setUser({ userId, token, username: pseudo, avatar: getAvatar(userId) });
  };
  const handleStoreUser = user => {
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
    location.reload();
  };
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser({ userId: null, token: null, username: null, avatar: null });
  };
  const { userId, token, username } = user;
  return (
    <userContext.Provider
      value={{ username, userId, token, login: handleLogin, logout: handleLogout, avatar: getAvatar(userId) }}
      {...rest}
    />
  );
}

export default userContext;
