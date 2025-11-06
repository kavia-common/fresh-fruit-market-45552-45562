import React from "react";

// PUBLIC_INTERFACE
export default function ProductCard({ product, onAdd }) {
  /** Display product with name, price, and add button */
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        background: "#ffffff",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 140,
          background:
            "repeating-linear-gradient(45deg,#F59E0B22 0,#F59E0B22 10px,transparent 10px,transparent 20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label={`${product.name} image`}
      >
        <span style={{ fontSize: 48 }}>🍓🍊🍎🍌</span>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>
          {product.name}
        </div>
        <div style={{ fontSize: 13, color: "#4b5563", marginTop: 4 }}>
          {product.description}
        </div>
        <div
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "#2563EB", fontWeight: 700 }}>
            ${product.price.toFixed(2)} <span style={{ color: "#6b7280", fontWeight: 400 }}>/ {product.unit}</span>
          </div>
          <button
            onClick={onAdd}
            style={{
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "8px 10px",
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: "0 2px 4px rgba(37,99,235,0.25)",
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
