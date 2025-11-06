import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/client";
import { useCart } from "../contexts/CartContext";
import Loading from "../components/Loading";

// PUBLIC_INTERFACE
export default function ProductDetail() {
  /** Product detail page with quantity selection */
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    let active = true;
    fetchProductById(id).then((data) => {
      if (active) {
        setProduct(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <Loading label="Loading product..." />;
  if (!product)
    return (
      <main style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
        <p>Product not found.</p>
        <Link to="/#/">← Back to home</Link>
      </main>
    );

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div
          style={{
            minHeight: 260,
            background:
              "repeating-linear-gradient(-45deg,#2563EB14 0,#2563EB14 12px,transparent 12px,transparent 24px)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label={`${product.name} image`}
        >
          <span style={{ fontSize: 80 }}>🍎</span>
        </div>
        <div>
          <h2 style={{ marginTop: 0 }}>{product.name}</h2>
          <p style={{ color: "#4b5563" }}>{product.description}</p>
          <div style={{ color: "#2563EB", fontWeight: 700, fontSize: 20 }}>
            ${product.price.toFixed(2)}{" "}
            <span style={{ color: "#6b7280", fontWeight: 400, fontSize: 14 }}>
              / {product.unit}
            </span>
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
            <label htmlFor="qty">Qty</label>
            <input
              id="qty"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              style={{
                width: 80,
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.12)",
              }}
            />
            <button
              onClick={() => addItem(product, qty)}
              style={{
                background: "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 12px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Add to cart
            </button>
            <Link to="/#/cart" style={{ marginLeft: "auto", color: "#2563EB" }}>
              Go to cart →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
