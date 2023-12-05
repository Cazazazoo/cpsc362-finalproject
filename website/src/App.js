import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Link} from 'react-router-dom'
import './App.css';
import Contact from './Contact';
import Signup from './signup';
import NewPoll from './newpoll';
import Login from './login';
import ViewPoll from './viewpoll'
import Donate from './Donate';
import Viewanswers from './viewanswers';
import Credits from './creditsbar';
import SearchBar from './pollidfinder';

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
            <a href='/newpoll' className='nav-links'>
              New Poll 
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newpoll" element={<NewPoll />} />
          <Route path="/viewpoll/:pollID" element={<ViewPoll />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/viewanswers/:pollID" element={<Viewanswers />}/>
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
        <h2 className='button-container'>
          <Link to="/newpoll">
            <button className={'button-style'}>
              Create a Poll
            </button>
          </Link>
          <SearchBar/>
        </h2>
        <img src="https://i.imgflip.com/85j4a3.jpg" alt='img'
          align="center"
          width="450px"
          height="650px"
        />
        <Credits/>
      </div>

  );
}



export default App;