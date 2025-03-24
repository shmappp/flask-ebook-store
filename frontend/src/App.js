import React, { useState, useEffect } from 'react';
import './App.css';
import DarkModeToggle from './components/DarkModeToggle.js';
import BookTable from './components/BookTable.js'



function App() {


  return (
      <div className="App">
      <h1>.epub store</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ margin: '0 auto', marginTop: '20px' }}>
            <BookTable/>
          </div>
          <div style={{ position: 'absolute', right: '20px' }}>
            <DarkModeToggle/>
          </div>
        </div>
      </div>
  );
}

export default App;
