import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function NotFound() {
  /** Not found page */
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h2>Page Not Found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/#/" style={{ color: "#2563EB" }}>
        Back to home →
      </Link>
    </main>
  );
}
