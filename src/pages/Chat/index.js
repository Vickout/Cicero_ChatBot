import React, { useEffect, useCallback, useState } from 'react';

// import { Container } from './styles';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

function Chat() {
  const { setToken } = useAuth();

  const [messages, setMessages] = useState([]);

  const sendMessageChat = useCallback(async (message) => {
    const token = localStorage.getItem('@CICERO_CHAT: token');
    const response = await api.post('/botman', {
        driver: "web",
        userId: token,
        message,
    });
    const { messages } = response.data;

    setMessages(messages);
  }, []);

  useEffect(() => {
    setToken();
  }, [setToken]);

  return (
    <div>
      <h1>teste</h1>
    </div>
);
}

export default Chat;