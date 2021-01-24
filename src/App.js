import React, { useState, useEffect } from 'react';
import './App.css';
import Crypto from './components/crypto/Crypto';


function App() {
  return (
    <div className='coin-app'>
        <Crypto />
    </div>
  );
}

export default App;
