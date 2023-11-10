import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Contact from './Contact';
import Signup from './Signup';
import NewPoll from './newpoll';
import Login from './login';
import ViewPoll from './viewpoll'
import Login from './login';
import Donate from './Donate';
import FindPoll from './findpoll';

function App() {
  
  return (
    <BrowserRouter>

    <nav className='navbar'>
      <div className='navbar-container'>
        <a href="/" className='navbar-logo'>
          Polls.io <i className='fab fa-typo3' />
        </a>
        <div className='menu-icon'>

        </div>
        <u1>
          <li className='nav-item'>
            <a href="/" className="nav-links">
              Home 
            </a>
          </li>
          <li className='nav-item'>
            <a href='/newPoll' className='nav-links'>
              New Poll 
            </a>
          </li>
          <li className='nav-item'>
            <a href='/findPoll' className='nav-links'>
              Find Poll
            </a>
          </li>
          <li className='nav-item'>
            <a href="/signup" className='nav-links'>
              Sign up 
            </a>
          </li>
          <li className='nav-item'>
            <a href="/login" className='nav-links'>
              Log in
            </a>
          </li>
          <li className='nav-item'>
            <a href="/viewpoll" className='nav-links'>
              View Poll
            </a>
          </li>
          <li className='nav-item'>
            <a href="/donate" className='nav-donate'>
              Buy us an English Tea!
            </a>
          </li>
          <li className='nav-item'>
            <a href="/contact" className='nav-links'>
              Contact
            </a>
          </li>
        </u1>
      </div>
    </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findPoll" element={<FindPoll />} />
          <Route path="/newPoll" element={<NewPoll />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newpoll" element={<NewPoll />} />
          <Route path="/viewpoll" element={<ViewPoll />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </BrowserRouter>
  );
}



function Home() {
  return (
    <div className="home-container">
      <h1>
        Welcome to Polls.io
      </h1>
      <h2>
        Create your new poll now!
      </h2>
      <img src="https://i.imgflip.com/85j4a3.jpg" alt='img'
        align="center"
        width="450px"
        height="650px"
      />
    </div>
  );
}

export default App;
