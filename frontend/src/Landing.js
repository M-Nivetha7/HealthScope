import React from "react";
import { Link } from "react-router-dom";

function Landing({ user }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "40px 16px",
        background: "radial-gradient(circle at top, #22c1c3, #0f172a)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#f9fafb",
        overflow: "hidden",
      }}
    >
      {/* Floating blobs */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "conic-gradient(from 180deg at 50% 50%, #34d399, #22d3ee, #6366f1, #34d399)",
          opacity: 0.4,
          filter: "blur(20px)",
          animation: "spin 18s linear infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -80,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "conic-gradient(from 90deg at 50% 50%, #f97316, #ec4899, #a855f7, #f97316)",
          opacity: 0.3,
          filter: "blur(22px)",
          animation: "spin 24s linear infinite reverse",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          maxWidth: 960,
          margin: "0 auto",
          zIndex: 1,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "999px",
                background:
                  "linear-gradient(135deg, #22c55e, #a855f7, #38bdf8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              }}
            >
              <span style={{ fontWeight: 800, fontSize: 18 }}>H</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 22 }}>HealthScope</span>
          </div>
          <nav style={{ display: "flex", gap: 12, fontSize: 14 }}>
            {user ? (
              <span>Hi, {user.username}</span>
            ) : (
              <>
                <Link to="/login" style={{ color: "#e5e7eb" }}>
                  Log in
                </Link>
                <Link
                  to="/signup"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    background: "#f97316",
                    color: "#111827",
                    fontWeight: 600,
                  }}
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </header>

        <main
          style={{
            display: "grid",
            gap: 28,
            gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
            alignItems: "center",
          }}
        >
          <section>
            <h1
              style={{
                fontSize: 38,
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Your smart companion for{" "}
              <span style={{ color: "#a5b4fc" }}>symptom insights</span>.
            </h1>
            <p style={{ fontSize: 15, color: "#e5e7eb", marginBottom: 20 }}>
              HealthScope helps you understand possible conditions based on your
              symptoms, age, and lifestyle. Built for quick triage and learning,
              not for final diagnosis.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <Link
                to="/app"
                style={{
                  padding: "10px 20px",
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg, #22c55e, #a855f7, #38bdf8)",
                  fontWeight: 600,
                  color: "#020617",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                }}
              >
                Launch Symptom Checker
              </Link>
              <Link
                to="/signup"
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(148,163,184,0.7)",
                  color: "#e5e7eb",
                  fontWeight: 500,
                }}
              >
                Create free account
              </Link>
            </div>
          </section>

          <section>
            {/* animated card with pulse */}
            <div
              style={{
                borderRadius: 18,
                padding: 18,
                backgroundColor: "rgba(15,23,42,0.92)",
                border: "1px solid rgba(148,163,184,0.5)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.55)",
                animation: "float 4s ease-in-out infinite",
              }}
            >
              <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 4 }}>
                Live preview
              </p>
              <div
                style={{
                  borderRadius: 12,
                  padding: 12,
                  background:
                    "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(129,140,248,0.2))",
                }}
              >
                <p style={{ fontSize: 13, marginBottom: 6 }}>
                  Symptoms:{" "}
                  <span style={{ color: "#f9fafb" }}>
                    headache, nausea, chest_pain
                  </span>
                </p>
                <p
                  style={{
                    fontSize: 13,
                    marginBottom: 6,
                    color: "#bbf7d0",
                  }}
                >
                  Top match: Anxiety disorder (82%)
                </p>
                <p style={{ fontSize: 12, color: "#e5e7eb" }}>
                  Recommended: control breathing, reduce caffeine, consult a
                  professional if symptoms persist.
                </p>
              </div>
              <p
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  color: "#9ca3af",
                }}
              >
                This is not a medical diagnosis. Always consult a doctor for
                medical decisions.
              </p>
            </div>
          </section>
        </main>
      </div>

      {/* simple CSS keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Landing;
