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
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>Log In</button>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
