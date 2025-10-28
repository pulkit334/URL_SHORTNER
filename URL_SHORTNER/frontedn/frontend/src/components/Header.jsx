import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("free_uses");
    navigate("/login");
    setTimeout(() => window.location.reload(), 300); // small delay to refresh UI
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-600 tracking-tight hover:scale-105 transition-transform"
        >
          PulseLink ⚡
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link
            to="/"
            className={`transition hover:text-blue-600 ${
              pathname === "/"
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className={`transition hover:text-blue-600 ${
              pathname === "/dashboard"
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/analytics/all"
            className={`transition hover:text-blue-600 ${
              pathname.startsWith("/analytics")
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                : ""
            }`}
          >
            Analytics
          </Link>
        </nav>

        {/* Right Side Auth */}
        <div className="flex items-center gap-3">
          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative group">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2">
                👤 {userName}
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
