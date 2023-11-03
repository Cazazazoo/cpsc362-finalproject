import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Contact from './contact';
import Signup from './signup';
import NewPoll from './newpoll';
import Login from './login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <a href="/">Home</a>
          <a href="/signup">Sign up</a>
          <a href="/login">Log in</a>
          <a href="/contact">Contact</a>
          <a href='/newPoll'>New Poll</a>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newPoll" element={<NewPoll />} />
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
