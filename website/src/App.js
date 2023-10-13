import React, { useState } from 'react';
import './App.css';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State for the message

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // You can add your login logic here
    if (username === 'yourUsername' && password === 'yourPassword') {
      setMessage('Login successful');
    } else {
      setMessage('Login failed');
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <div className = "top-bar">
          <div className="login-inputs">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <div className="small-text">{message}</div> {/* Display the message */}
         
        </div>
      </header>
    </div>
  );
}

export default App;
