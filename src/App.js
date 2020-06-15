import React from 'react';
import AppProvider from './hooks';

import Chat from './pages/Chat';

const App = () => (
    <AppProvider>
      <Chat />
    </AppProvider>
);

export default App;
