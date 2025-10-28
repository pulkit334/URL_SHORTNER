import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (attempts >= 3) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // ❌ Removed token
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // ✅ Store token for future
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        setAttempts((prev) => prev + 1);
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setAttempts((prev) => prev + 1);
      setError("Server error, please try again.");
    }
  };

  return (
    <main className="container">
      <div className="card max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {attempts < 3 ? (
            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3"
            >
              Login
            </button>
          ) : (
            <div className="text-center">
              <p className="text-red-600 font-medium mb-2">
                Too many failed attempts!
              </p>
              <Link
                to="/signup"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Sign Up Instead
              </Link>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
