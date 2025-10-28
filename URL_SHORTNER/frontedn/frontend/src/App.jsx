import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

export default function App() {
  const [links, setLinks] = useState(() =>
    JSON.parse(localStorage.getItem("links") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  const handleSave = (item) => setLinks([item, ...links]);
  const handleRemove = (id) => setLinks(links.filter((l) => l.id !== id));

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home onSave={handleSave} />} />
        <Route
          path="/dashboard"
          element={<Dashboard links={links} onRemove={handleRemove} />}
        />
        <Route path="/analytics/:id" element={<Analytics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <footer className="bg-gray-900 text-gray-200 text-center py-6 mt-10 animate-fadeInUp">
        <p className="mb-2">
          © {new Date().getFullYear()} PulseLink — Built with ❤️ for developers
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <a href="#about" className="hover:text-blue-400">About</a>
          <a href="#privacy" className="hover:text-blue-400">Privacy</a>
          <a href="#contact" className="hover:text-blue-400">Contact</a>
        </div>
      </footer>
    </Router>
  );
}
