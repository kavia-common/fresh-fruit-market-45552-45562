import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

// PUBLIC_INTERFACE
export default function Cart() {
  /** Shopping cart page */
  const { items, updateQty, removeItem, subtotal, tax, shipping, total } = useCart();

  return (
    <main style={{ maxWidth: 1080, margin: "0 auto", padding: 16 }}>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <div
          style={{
            padding: 16,
            border: "1px dashed rgba(0,0,0,0.15)",
            borderRadius: 12,
            background:
              "repeating-linear-gradient(45deg,#F59E0B11 0,#F59E0B11 12px,transparent 12px,transparent 24px)",
          }}
        >
          Your cart is empty.{" "}
          <Link to="/#/" style={{ color: "#2563EB" }}>
            Continue shopping →
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          <section
            style={{
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 12,
              background: "#fff",
              padding: 12,
            }}
          >
            {items.map((it) => (
              <div
                key={it.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px 80px 80px",
                  gap: 8,
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{it.name}</div>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>${it.price.toFixed(2)} / {it.unit}</div>
                </div>
                <div>
                  <input
                    aria-label={`Quantity for ${it.name}`}
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value)))}
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      borderRadius: 10,
                      border: "1px solid rgba(0,0,0,0.12)",
                    }}
                  />
                </div>
                <div style={{ fontWeight: 600 }}>
                  ${(it.price * it.qty).toFixed(2)}
                </div>
                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={() => removeItem(it.id)}
                    style={{
                      background: "#EF4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 8px",
                      cursor: "pointer",
                    }}
                    aria-label={`Remove ${it.name}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>

          <aside
            style={{
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 12,
              background: "#fff",
              padding: 12,
              position: "sticky",
              top: 80,
            }}
          >
            <h3 style={{ marginTop: 0 }}>Summary</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 6 }}>
              <div>Subtotal</div>
              <div>${subtotal.toFixed(2)}</div>
              <div>Tax</div>
              <div>${tax.toFixed(2)}</div>
              <div>Shipping</div>
              <div>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</div>
              <div style={{ borderTop: "1px dashed rgba(0,0,0,0.15)", marginTop: 8 }} />
              <div style={{ fontWeight: 700 }}>Total</div>
              <div style={{ fontWeight: 700 }}>${total.toFixed(2)}</div>
            </div>
            <Link
              to="/#/checkout"
              style={{
                display: "inline-block",
                marginTop: 12,
                background: "#2563EB",
                color: "#fff",
                textDecoration: "none",
                borderRadius: 10,
                padding: "10px 12px",
                fontWeight: 600,
                textAlign: "center",
                width: "100%",
              }}
            >
              Proceed to Checkout →
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
