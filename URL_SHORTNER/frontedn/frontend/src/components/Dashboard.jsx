import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard({ links, onRemove }) {
  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Saved Links</h2>
      {links.length === 0 ? (
        <p>No links saved yet.</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="p-3">Original URL</th>
              <th className="p-3">Shortened</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((l) => (
              <tr key={l.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 break-all text-sm text-gray-700">
                  {l.original}
                </td>
                <td className="p-3">
                  <a href={l.short} className="text-blue-600 underline">
                    {l.short}
                  </a>
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => window.open(l.short)}
                    className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
                  >
                    Open
                  </button>
                  <Link
                    to={`/analytics/${l.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Analytics
                  </Link>
                  <button
                    onClick={() => onRemove(l.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
