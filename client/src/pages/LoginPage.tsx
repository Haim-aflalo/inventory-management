import { useState } from 'react';
import { mockUsers } from '../data/usersData';
import type { User } from '../data/usersData';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function checkUser(username: string, password: string): User | undefined {
    const isUser = mockUsers.find(
      (user) => user.username === username && user.password === password,
    );
    return isUser;
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const isValid = checkUser(username, password);
    if (isValid) {
      localStorage.setItem('userId', isValid.id);
      navigate('/dashboard');
    } else {
      setMessage('Invalid username or password !');
    }
  }

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
       <p>{message}</p>
      </form>
    </div>
  );
}

export default LoginPage;
