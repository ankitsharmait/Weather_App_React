import React from 'react';
import Weathercard from './components/weathercard.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <Weathercard/>
    </div>
    
  );
};

export default App;
