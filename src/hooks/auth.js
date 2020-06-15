import React, { createContext, useCallback, useState, useContext } from 'react';
import { uuid } from 'uuidv4';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@CICERO_CHAT: token');
    if (token) {
      return { token };
    }
    return {messages: [], token: ''};
  });

  const setToken = useCallback(() => {
    const { token } = data;
    if (!token) {
        const tokenUuid = uuid();
        localStorage.setItem('@CICERO_CHAT: token', tokenUuid);
        setData({ token: tokenUuid });
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth()  {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
