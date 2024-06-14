import React, { useState } from "react";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    // Basic form validation
    if (username.length < 8) {
      setError("Username must be at least 8 characters long.");
      return;
    }

    // Continue with form submission
    submitForm();
  }

  async function submitForm() {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json();
      setToken(result.token); 
      console.log(result);

      // Clear the form after successful submission
      setUsername("");
      setPassword("");
      setError(null);

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="signup-form">
      <h2>Sign Up!</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
