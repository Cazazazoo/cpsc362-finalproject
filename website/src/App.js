import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Contact from './Contact';
import Signup from './Signup';
import NewPoll from './newpoll';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <a href="/">Home</a>
          <a href="/Signup">Sign up</a>
          <a href="/Contact">Contact</a>
          <a href='/NewPoll'>New Poll</a>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/NewPoll" element={<NewPoll />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Base Page</h1>
      <p>This is the base page content. You can add your content here.</p>
    </div>
  );
}

export default App;
