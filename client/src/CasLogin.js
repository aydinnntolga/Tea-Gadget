import React, { useState } from 'react';

function CasLogin() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const checkUser = async () => {
    try {
      const response = await fetch('http://localhost:5001/usersearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username }),
      });
      
      const data = await response.text(); 
  
      if (response.ok && data === "Kullanıcı bulundu") { 
        redirectToCASLogin();
      } else {
        setMessage(data);
      }
    } catch (error) {
      console.error('Error during user search:', error);
      setMessage('Failed to check the user');
    }
  };

  const redirectToCASLogin = () => {
    const serviceUrl = encodeURIComponent('http://localhost:3000/admin');
    const casLoginUrl = `https://login.sabanciuniv.edu/cas/login?service=${serviceUrl}`;
    window.location.href = casLoginUrl;
    
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>CAS User Check</h1>
      </header>
      <div className='input-group'>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='input-box'
        />
        <button onClick={checkUser} className='submit-button'>
          Check the user
        </button>
      </div>
      {message && <p className='message'>{message}</p>}
    </div>
  );
}

export default CasLogin;