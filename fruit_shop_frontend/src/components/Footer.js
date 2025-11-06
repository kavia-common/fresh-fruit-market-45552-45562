import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Footer() {
  /** Footer with simple links and contact */
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,0,0,0.08)",
        background: "#ffffff",
        marginTop: 24,
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          color: "#374151",
          fontSize: 14,
        }}
      >
        <div>© {new Date().getFullYear()} Fresh Fruit Market</div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/#/" style={{ color: "#2563EB", textDecoration: "none" }}>
            Home
          </Link>
          <a
            href="mailto:support@freshfruit.example"
            style={{ color: "#2563EB", textDecoration: "none" }}
          >
            Contact
          </a>
          <a
            href="https://example.com/about"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2563EB", textDecoration: "none" }}
          >
            About
          </a>
        </div>
      </div>
    </footer>
  );
}
