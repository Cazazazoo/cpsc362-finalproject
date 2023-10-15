import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Simulate authentication (replace with server authentication)
    if (username === 'yourUsername' && password === 'yourPassword') {
      // Successful login
      setErrorMessage('');
      alert('Logged in!');
    } else {
      // Failed login
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className='login-container'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange}
            style={{ width: '300px', height: '40px', fontSize: '25px' }}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            style={{ width: '300px', height: '40px', fontSize: '25px' }}
          />
        </div>
        <button type='submit' style={{ width: '100px', height: '30px', fontSize: '20px' }}>Log In</button>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <div>
          <p>Stored Username: {username}</p>
          <p>Stored Password: {password}</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
