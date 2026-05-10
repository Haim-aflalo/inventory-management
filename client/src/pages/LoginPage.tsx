import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function checkUser(username: string, password: string) {
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        username,
        password,
      });
      if (response.status === 200) {
        const token = response.data.data;
        localStorage.setItem('token', token);
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error(error.message);
      setMessage('Invalid username or password');
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username && password) {
      checkUser(username, password);
    } else {
      setMessage('Veuillez remplir tous les champs !');
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
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
    </div>
  );
}

export default LoginPage;
