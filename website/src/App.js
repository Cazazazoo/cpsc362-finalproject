import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Contact from './Contact';
import Signup from './Signup';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <a href="/">Home</a>
          <a href="/Signup">Sign up</a>
          <a href="/Contact">Contact</a>
        </header>
      
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/Signup" element={<Signup/>} />
        </Routes>
        <div className="home-container">
          <h1>Welcome to the Base Page</h1>
          <p>This is the base page content. You can add your content here.</p>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
