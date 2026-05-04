import { useState } from "react";
import { mockUsers } from "../data/usersData";
import "../styles/Login.css";

function LoginPages() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function checkUser(username: string, password: string): boolean {
    const isUser = mockUsers.find(
      (user) => user.username === username && user.password === password,
    );
    return isUser !== undefined;
  }
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const isValid = checkUser(username, password);
    setMessage(isValid ? "Login successful!" : "Invalid ID or username.");
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
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default LoginPages;
