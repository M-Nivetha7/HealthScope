import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PredictorPage() {
  const [symptomsInput, setSymptomsInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect to login if not "logged in" (frontend-only auth)
  useEffect(() => {
    const loggedIn = localStorage.getItem("healthscopeLoggedIn") === "true";
    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const symptoms = symptomsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (symptoms.length === 0) {
      setError("Please enter at least one symptom, separated by commas.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} - ${text}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to get prediction. Check if Django server is running.");
    } finally {
      setLoading(false);
    }
  };

  const username = localStorage.getItem("healthscopeUsername") || "Guest";

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 16px",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "#e5e7eb",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* Top bar with user + logout */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
        }}
      >
        <span style={{ color: "#9ca3af" }}>Logged in as</span>
        <span style={{ fontWeight: 600 }}>{username}</span>
        <button
          onClick={() => {
            localStorage.removeItem("healthscopeLoggedIn");
            localStorage.removeItem("healthscopeUsername");
            navigate("/login");
          }}
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            border: "1px solid #4b5563",
            background: "transparent",
            color: "#e5e7eb",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          maxWidth: 900,
          margin: "40px auto 0",
          backgroundColor: "#020617",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "1px solid #1f2937",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: 8 }}>
          Symptom → Disease Predictor
        </h1>
        <p
          style={{
            marginTop: 0,
            marginBottom: 16,
            fontSize: 14,
            color: "#9ca3af",
          }}
        >
          Enter symptoms separated by commas, for example:{" "}
          <strong>itching, skin_rash, nodal_skin_eruptions</strong>
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
          <textarea
            rows={3}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 8,
              border: "1px solid #374151",
              backgroundColor: "#020617",
              color: "#f9fafb",
            }}
            value={symptomsInput}
            onChange={(e) => setSymptomsInput(e.target.value)}
            placeholder="itching, skin_rash, nodal_skin_eruptions"
          />
          <button
            type="submit"
            style={{
              marginTop: 10,
              padding: "8px 16px",
              borderRadius: 999,
              border: "none",
              background: "#22c55e",
              color: "#022c22",
              fontWeight: 600,
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {error && (
          <p style={{ color: "#fca5a5", marginTop: 10 }}>
            {error}
          </p>
        )}

        {result && (
          <div style={{ marginTop: 24 }}>
            <h2>Predictions</h2>
            <p>
              <strong>Symptoms:</strong> {result.input.symptoms.join(", ")}
            </p>

            {result.predictions.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #1f2937",
                  borderRadius: 10,
                  padding: 12,
                  marginTop: 10,
                  backgroundColor: "#020617",
                }}
              >
                <h3 style={{ marginTop: 0 }}>{item.disease}</h3>
                <p>
                  <strong>Probability:</strong>{" "}
                  {(item.probability * 100).toFixed(2)}%
                </p>
                <p>
                  <strong>Description:</strong> {item.description}</p>
                {item.precautions && item.precautions.length > 0 && (
                  <div>
                    <strong>Precautions:</strong>
                    <ul>
                      {item.precautions.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <p style={{ marginTop: 16, color: "#f97373" }}>
              <strong>Disclaimer:</strong> {result.disclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictorPage;
