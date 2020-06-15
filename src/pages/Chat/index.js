import React, { useEffect, useCallback, useState } from 'react';
import { ChatBox } from 'react-chatbox-component';
import 'react-chatbox-component/dist/style.css';
import './style.css';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

const firstMessages = [
  {
    "text": "Hello there",
    "id": "1",
    "sender": {
      "name": "Ironman",
      "uid": "user1",
      "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
    },
  },
  {
    "text": "Hi Mr. Stark",
    "id": "2",
    "sender": {
      "name": "Spiderman",
      "uid": "user2",
      "avatar": "https://data.cometchat.com/assets/images/avatars/spiderman.png",
    },
  },
  {
    "text": "Hello Spiderman, how are you today?",
    "id": "3",
    "sender": {
      "name": "Ironman",
      "uid": "user1",
      "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
    },
  },
];

const firstUser = {
  "uid": "user1"
};

function Chat() {
  const { setToken } = useAuth();

  const [messages, setMessages] = useState(firstMessages);
  const [user, setUser] = useState(firstUser);

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
    <div className='container'>
      <div className='chat-header'>
        <h5>Seja <strong>bem-vindo!</strong> </h5>
      </div>
      <ChatBox messages={messages} user={user} />
    </div>
  );
}


export default Chat;