import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";

// PUBLIC_INTERFACE
export default function Header() {
  /** Top navigation with branding, theme toggle, and cart badge */
  const { theme, toggleTheme } = useTheme();
  const { count } = useCart();

  return (
    <header
      style={{
        background: "linear-gradient(90deg,#2563EB11,#ffffff,#2563EB11)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 28,
                height: 28,
                background:
                  "radial-gradient(circle at 30% 30%, #F59E0B 0%, #F59E0B 35%, #ffbf47 70%)",
                borderRadius: "50%",
                boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.06)",
              }}
            />
            <h1 style={{ fontSize: 18, margin: 0, letterSpacing: 0.3 }}>
              Fresh Fruit Market
            </h1>
          </div>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link to="/#/" />
          <Link
            to="/#/cart"
            style={{
              position: "relative",
              textDecoration: "none",
              color: "#111827",
              fontWeight: 600,
            }}
            aria-label={`Cart with ${count} items`}
          >
            🧺 Cart
            {count > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -8,
                  right: -12,
                  background: "#2563EB",
                  color: "#fff",
                  padding: "2px 6px",
                  fontSize: 12,
                  borderRadius: 10,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={toggleTheme}
            style={{
              border: "1px solid rgba(0,0,0,0.1)",
              background: theme === "light" ? "#ffffff" : "#0f172a",
              color: theme === "light" ? "#111827" : "#e5e7eb",
              borderRadius: 10,
              padding: "6px 10px",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>
      </div>
    </header>
  );
}
