import React, { useState } from "react";
import { mockUsers } from "../data/usersData";

function LoginPages() {
  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  function checkUser(id: number, username: string): boolean {
    const isUser = mockUsers.find(
      (user) => user.id === id && user.username === username,
    );
    return isUser !== undefined;
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isValid = checkUser(id, username);
    setMessage(isValid ? "Login successful!" : "Invalid ID or username.");
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="id"
          onChange={(e) => setId(Number(e.target.value))}
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

export default LoginPages;
