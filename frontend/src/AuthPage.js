import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Decide initial mode from URL: /login or /signup
  const initialMode = location.pathname === "/signup" ? "signup" : "login";

  const [mode, setMode] = useState(initialMode); // "login" | "signup"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Keep mode in sync if user navigates directly
  useEffect(() => {
    setMode(location.pathname === "/signup" ? "signup" : "login");
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    const storedUserRaw = localStorage.getItem("healthscopeUser");

    if (mode === "signup") {
      // For demo: always (over)write the local user
      localStorage.setItem(
        "healthscopeUser",
        JSON.stringify({ username, password })
      );
    } else {
      // login
      if (!storedUserRaw) {
        setError("No account found. Please sign up first.");
        return;
      }
      const storedUser = JSON.parse(storedUserRaw);
      if (
        storedUser.username !== username ||
        storedUser.password !== password
      ) {
        setError("Invalid username or password.");
        return;
      }
    }

    // Mark as logged in (frontend-only)
    localStorage.setItem("healthscopeLoggedIn", "true");
    localStorage.setItem("healthscopeUsername", username);

    navigate("/app");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #22c1c3, #0f172a)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: 360,
          padding: 24,
          borderRadius: 16,
          backgroundColor: "#020617",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          color: "#e5e7eb",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 4, textAlign: "center" }}>
          HealthScope
        </h2>
        <p style={{ marginTop: 0, marginBottom: 16, textAlign: "center" }}>
          {mode === "login" ? "Log in to continue" : "Create your account"}
        </p>

        {/* Mode switch */}
        <div
          style={{
            display: "flex",
            borderRadius: 999,
            backgroundColor: "#020617",
            border: "1px solid #1f2937",
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode("login");
              navigate("/login");
              setError("");
            }}
            style={{
              flex: 1,
              padding: "6px 0",
              border: "none",
              cursor: "pointer",
              backgroundColor: mode === "login" ? "#22c55e" : "transparent",
              color: mode === "login" ? "#020617" : "#e5e7eb",
              fontWeight: 600,
            }}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              navigate("/signup");
              setError("");
            }}
            style={{
              flex: 1,
              padding: "6px 0",
              border: "none",
              cursor: "pointer",
              backgroundColor: mode === "signup" ? "#22c55e" : "transparent",
              color: mode === "signup" ? "#020617" : "#e5e7eb",
              fontWeight: 600,
            }}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: 13 }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              marginTop: 4,
              marginBottom: 12,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #374151",
              backgroundColor: "#020617",
              color: "#f9fafb",
            }}
          />

          <label style={{ fontSize: 13 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              marginTop: 4,
              marginBottom: 16,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #374151",
              backgroundColor: "#020617",
              color: "#f9fafb",
            }}
          />

          {error && (
            <p style={{ color: "#fca5a5", fontSize: 13, marginBottom: 10 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "8px 0",
              borderRadius: 999,
              border: "none",
              background:
                "linear-gradient(135deg, #22c55e, #a855f7, #38bdf8)",
              color: "#020617",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
