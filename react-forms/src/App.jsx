import React, { useState, useEffect } from "react";
import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";
import "./App.css"

export default function App() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data if token exists
    if (token) {
      fetchUserData();
    }
  }, [token]);

  async function fetchUserData() {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.data) {
        setUserData(result.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <div className="app-container">
      <Authenticate token={token} setToken={setToken} />
      <SignUpForm token={token} setToken={setToken} />

      {userData && (
        <div className="user-info">
          <p>Welcome, {userData.username}!</p>
        </div>
      )}
    </div>
  );
}
