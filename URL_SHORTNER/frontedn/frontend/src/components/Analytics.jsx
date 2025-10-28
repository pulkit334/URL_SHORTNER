import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const backendBase = "http://localhost:5000";

export default function Analytics() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${backendBase}/urla/analytics/${id}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ error: "Failed to load analytics" }));
  }, [id]);

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Analytics Dashboard 📊
      </h2>
      {!data ? (
        <p>Loading analytics...</p>
      ) : data.error ? (
        <p className="text-red-500">{data.error}</p>
      ) : (
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <p className="mb-4 text-lg">
            Total Clicks: <b>{data.totalClicks || 0}</b>
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            {data.analytics && data.analytics.length ? (
              data.analytics.map((a, i) => (
                <li key={i}>
                  {new Date(a.Timestamp).toLocaleString()}
                </li>
              ))
            ) : (
              <p>No visits yet.</p>
            )}
          </ul>
        </div>
      )}
    </main>
  );
}
