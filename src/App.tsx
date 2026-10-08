import React from 'react';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-[#F5F5F0]">
      <HomePage />
    </div>
  );
};

export default App;