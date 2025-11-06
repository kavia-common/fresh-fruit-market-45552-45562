import React from "react";

// PUBLIC_INTERFACE
export default function Loading({ label = "Loading..." }) {
  /** Simple loading indicator */
  return (
    <div
      style={{
        padding: 24,
        textAlign: "center",
        color: "#6b7280",
      }}
      role="status"
      aria-live="polite"
    >
      <span style={{ fontSize: 18 }}>⏳</span>
      <div style={{ marginTop: 8 }}>{label}</div>
    </div>
  );
}
