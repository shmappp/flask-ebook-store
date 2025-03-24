import React, { useState, useEffect } from 'react';
import './App.css';
import DarkModeToggle from './components/DarkModeToggle.js';
import BookTable from './components/BookTable.js'



function App() {


  return (
      <div className="App">
        <div style={{ position: 'absolute', right: '20px' }}>
          <DarkModeToggle/>
        </div>
      <h1>.epub store</h1>
      <div className='center'>
          <BookTable/>
        </div>
      </div>
  );
}

export default App;
