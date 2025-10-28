import React, { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ❌ Removed token
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  return (
    <main className="container">
      <div className="card max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Create Account ✨
        </h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
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
          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white rounded-lg p-3"
          >
            Signup
          </button>
        </form>
      </div>
    </main>
  );
}
