import React from 'react';
import { Routes } from './pages/Route';
import { TanstackQueryProvider } from './providers/TanstackQueryProvider';
import './style/index.scss';

const App: React.FC = () => {
  return (
    <TanstackQueryProvider>
      <Routes />
    </TanstackQueryProvider>
  );
}

export default App;
