import Dashboard from "./Dashboard";
import { useState } from "react";

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (
    <Dashboard />
  ) : (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🔐 Data Analyst AI Agent</h1>
      <button onClick={() => setLoggedIn(true)}>
        Enter Dashboard
      </button>
    </div>
  );
}
