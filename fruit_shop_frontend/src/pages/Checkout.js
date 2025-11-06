import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { submitCheckout } from "../api/client";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Checkout() {
  /** Checkout form to submit order */
  const { items, total, clear } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const canSubmit = items.length > 0 && name.trim() && address.trim();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || processing) return;
    setProcessing(true);
    const payload = {
      customer: { name, address },
      items: items.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
      total,
    };
    const confirmation = await submitCheckout(payload);
    setResult(confirmation);
    clear();
    setProcessing(false);
  };

  if (items.length === 0 && !result) {
    return (
      <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
        <p>Your cart is empty.</p>
        <Link to="/#/" style={{ color: "#2563EB" }}>
          Continue shopping →
        </Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h2>Checkout</h2>

      {result ? (
        <div
          style={{
            background: "#ecfeff",
            border: "1px solid #a5f3fc",
            color: "#155e75",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Order Confirmed 🎉</h3>
          <p>
            Order ID: <strong>{result.orderId}</strong>
          </p>
          <p>Status: {result.status}</p>
          <p>Estimated Delivery: {result.estimatedDeliveryDays} days</p>
          <Link to="/#/" style={{ color: "#2563EB" }}>
            Back to home →
          </Link>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 12,
            background: "#fff",
            padding: 12,
          }}
        >
          <div style={{ display: "grid", gap: 12 }}>
            <label>
              <div style={{ fontWeight: 600 }}>Full Name</div>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.12)",
                }}
              />
            </label>
            <label>
              <div style={{ fontWeight: 600 }}>Address</div>
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Market St, Springfield"
                rows={3}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.12)",
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={!canSubmit || processing}
            style={{
              marginTop: 12,
              background: canSubmit ? "#2563EB" : "#93c5fd",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 12px",
              cursor: canSubmit ? "pointer" : "not-allowed",
              fontWeight: 600,
            }}
          >
            {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      )}
    </main>
  );
}
