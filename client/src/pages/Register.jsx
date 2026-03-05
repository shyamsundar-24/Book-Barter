// client/src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      if (res.data && (res.data._id || res.data.user || res.data.msg)) {
        alert("Registered successfully! Please login.");
        nav("/login");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Registration error. Please try again.");
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
                <i className="bi bi-person-plus text-success"></i> Register
              </h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
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
                    placeholder="Create a password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={loading}>
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Registering...</>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
              <hr className="my-4" />
              <p className="text-center mb-0">
                Already have an account?{" "}
                <button onClick={() => nav("/login")} className="btn btn-link p-0">
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
