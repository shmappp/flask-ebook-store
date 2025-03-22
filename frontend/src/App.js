import React, { useState, useEffect } from 'react';
import './App.css';
import DarkModeToggle from './components/DarkModeToggle.js';



function App() {


  return (
    <div className="App">
      <h1>Dark mode test</h1>
      <p><DarkModeToggle/></p>
    </div>
  );
}

export default App;
