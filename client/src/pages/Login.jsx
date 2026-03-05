// client/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        const payload = parseJwt(res.data.token);
        if (payload?.id) localStorage.setItem("userId", payload.id);
        nav("/");
      } else {
        setError(res.data.msg || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Login error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">
                <i className="bi bi-box-arrow-in-right text-primary"></i> Login
              </h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Logging in...</>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <hr className="my-4" />
              <p className="text-center mb-0">
                Don't have an account?{" "}
                <button onClick={() => nav("/register")} className="btn btn-link p-0">
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
