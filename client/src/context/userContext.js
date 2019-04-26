import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext({ login: () => {}, logout: () => {}, username: null, userId: null, token: null });

export function UserProvider({ value, ...rest }) {
  const id = localStorage.getItem('userId');
  const tk = localStorage.getItem('token');
  const usr = localStorage.getItem('username');
  const [user, setUser] = useState({ userId: null, token: null, username: null });
  useEffect(() => {
    if (!tk && user.token) {
      handleStoreUser(user);
    }
  }, [user]);
  useEffect(() => {
    if (tk && !user.token) {
      setUser({ userId: id, token: tk, username: usr });
    }
  }, []);
  const handleLogin = ({ login }) => {
    const { userId, token, pseudo } = login;
    return setUser({ userId, token, username: pseudo });
  };
  const handleStoreUser = user => {
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.pseudo);
  };
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser({ userId: null, token: null, username: null });
  };
  const { userId, token, username } = user;
  return (
    <UserContext.Provider value={{ username, userId, token, login: handleLogin, logout: handleLogout }} {...rest} />
  );
}

export default UserContext;
