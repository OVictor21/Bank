import { useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }
    setError("");
    window.location.href = "/dashboard";
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#EBF5FB", display: "flex", flexDirection: "column", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ── Top Bar ── */}
      <header style={{ backgroundColor: "#005EB8", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Logo */}
          <div style={{ width: 44, height: 44, backgroundColor: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 18, height: 18, backgroundColor: "#005EB8", borderRadius: 3, transform: "rotate(45deg)" }} />
          </div>
          <div>
            <div style={{ color: "white", fontSize: 18, fontWeight: 700, letterSpacing: 0.5 }}>One Nevada</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>Credit Union</div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", backgroundColor: "#EBF5FB" }}>
        <div style={{ backgroundColor: "#ffffff", borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 420, border: "1px solid #d0e4f5" }}>

          {/* Title */}
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#003865", textAlign: "center", margin: "0 0 6px" }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: "#6b7f94", textAlign: "center", margin: "0 0 24px" }}>
            Sign in to your One Nevada account
          </p>

          <div style={{ height: 1, backgroundColor: "#e2edf6", marginBottom: 24 }} />

          {/* Error */}
          {error && (
            <div style={{ backgroundColor: "#fff0f0", border: "1px solid #fcc", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#c0392b", marginBottom: 16 }}>
              ⚠ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn}>

            {/* Username */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#2c4a6e", marginBottom: 6 }}>
                Username or Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or email"
                autoComplete="username"
                style={{
                  width: "100%", padding: "11px 14px", border: "1.5px solid #c5d9ec",
                  borderRadius: 8, fontSize: 14, color: "#1a2e45", backgroundColor: "#ffffff",
                  outline: "none", boxSizing: "border-box",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#005EB8"; e.target.style.boxShadow = "0 0 0 3px rgba(0,94,184,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#c5d9ec"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#2c4a6e", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    width: "100%", padding: "11px 44px 11px 14px", border: "1.5px solid #c5d9ec",
                    borderRadius: 8, fontSize: 14, color: "#1a2e45", backgroundColor: "#ffffff",
                    outline: "none", boxSizing: "border-box",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#005EB8"; e.target.style.boxShadow = "0 0 0 3px rgba(0,94,184,0.12)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#c5d9ec"; e.target.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6b7f94", fontSize: 13, fontWeight: 500 }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div style={{ textAlign: "right", marginBottom: 22 }}>
              <a href="/forgot-password" style={{ fontSize: 12, color: "#005EB8", textDecoration: "none", fontWeight: 500 }}>
                Forgot username or password?
              </a>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              style={{
                width: "100%", padding: "13px", backgroundColor: "#005EB8", color: "white",
                fontSize: 15, fontWeight: 700, border: "none", borderRadius: 8,
                cursor: "pointer", letterSpacing: 0.3,
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#004a96"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#005EB8"}
            >
              Sign In
            </button>

          </form>

          {/* Separator */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, backgroundColor: "#dde9f4" }} />
            <span style={{ fontSize: 12, color: "#8fa8c0", fontWeight: 500 }}>New to One Nevada?</span>
            <div style={{ flex: 1, height: 1, backgroundColor: "#dde9f4" }} />
          </div>

          {/* Enroll button */}
          <button
            type="button"
            onClick={() => window.location.href = "/signup"}
            style={{
              width: "100%", padding: "12px", backgroundColor: "white", color: "#005EB8",
              fontSize: 14, fontWeight: 600, border: "1.5px solid #005EB8",
              borderRadius: 8, cursor: "pointer",
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#EBF5FB"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
          >
            Enroll in Online Banking
          </button>

          {/* Security notice */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, backgroundColor: "#f0f7ff", border: "1px solid #c8ddf4", borderRadius: 8, padding: "12px 14px", marginTop: 20 }}>
            <span style={{ fontSize: 18, color: "#005EB8", flexShrink: 0 }}>🔒</span>
            <p style={{ fontSize: 12, color: "#3a5f84", lineHeight: 1.6, margin: 0 }}>
              <strong>Security notice:</strong> One Nevada will never call, email, or text asking for your password, PIN, or one-time code.
            </p>
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "white", borderTop: "1px solid #dde9f4", padding: "14px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 16px", marginBottom: 6 }}>
          {["Privacy Policy", "Security", "Accessibility", "Contact Us"].map((l) => (
            <a key={l} href="#" style={{ fontSize: 11, color: "#005EB8", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#8fa8c0", margin: 0 }}>
          © 2026 One Nevada Credit Union. Federally insured by NCUA.
        </p>
      </footer>

    </div>
  );
}
