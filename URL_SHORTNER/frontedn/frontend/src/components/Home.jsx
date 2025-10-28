import React, { useState } from "react";

export default function Home({ onSave }) {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");
  const token = localStorage.getItem("token"); 
  async function shorten() {
    setErr("");
    if (!url.trim()) {
      setErr("Enter a valid URL");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed");
      const shortUrl = `http://localhost:5000/url/${json.id}`;
      setShort({ id: json.id, original: url, short: shortUrl });
      onSave && onSave({ id: json.id, original: url, short: shortUrl });
      setUrl("");
    } catch (e) {
      setErr(e.message || "Server error");
    }
    setLoading(false);
  }

  return (
    <main className="container">
      <div className="card">
        <h2 className="text-2xl font-semibold mb-3">Shorten Your Link ✂️</h2>

        {!isLoggedIn ? (
          <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg">
            <p className="mb-2">
              ⚠️ You must <b>log in</b> or <b>sign up</b> to use the shortener.
            </p>
            <a
              href="/login"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go to Login
            </a>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-3">
              Paste a long URL below to generate a short one.
            </p>
            <div className="flex gap-2">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very/long/link"
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                className="btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={shorten}
                disabled={loading}
              >
                {loading ? "Shortening..." : "Shorten"}
              </button>
            </div>
            {err && <div className="text-red-500 mt-3">{err}</div>}
            {short && (
              <div className="mt-4 p-3 bg-gray-100 border rounded-lg">
                <p className="font-semibold">Your Short Link:</p>
                <a
                  href={short.short}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 break-all"
                >
                  {short.short}
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
