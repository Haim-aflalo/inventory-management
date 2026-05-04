import React, { useState } from 'react';
import { mockUsers } from '../data/usersData';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function checkUser(id: string, username: string) {
    return mockUsers.find(
      (user) => user.id === id && user.username === username,
    );
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = checkUser(id, username);
    if (user) {
      localStorage.setItem('userId', user.id);
      navigate('/dashboard');
    } else {
      setMessage('Invalid ID or username.');
    }
  }

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="id"
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
}

export default LoginPage;
