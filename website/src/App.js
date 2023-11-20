import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Link} from 'react-router-dom'
import './App.css';
import Contact from './Contact';
import Signup from './Signup';
import NewPoll from './newpoll';
import Login from './Login';
import ViewPoll from './viewpoll'
import Donate from './Donate';
import Viewanswers from './viewanswers';
import Credits from './Creditsbar';
import SearchButtonWithInput from './Button';


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
            <a href='/' className='nav-links'>
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
          <li className='nav-item'>
            <a href="/viewanswers" className='nav-links'>
              View answers
            </a>
          </li>
        </u1>
      </div>
    </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findPoll" element={<Home />} />
          <Route path="/newPoll" element={<NewPoll />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewpoll/:code" element={<ViewPoll />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/viewanswers" element={<Viewanswers />}/>
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
          <Link to="/newPoll">
            <button className={'button-style'}>
              Create a Poll
            </button>
          </Link>
          <Link to="/">
            <button className={'button-style'}>
              <SearchButtonWithInput />
            </button>
          </Link>
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