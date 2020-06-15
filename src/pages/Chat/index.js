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
      {console.log(messages)}
      <button onClick={() => sendMessageChat('hi') }>Mandar</button>
      <div><p>Olá</p>
        {messages && messages.map((item, key) => (
        <div>
          <p key={key}>{item.text}</p>
          <p>{item.type}</p>
        </div>
        ))}
       </div>
    </div>
);
}

export default Chat;