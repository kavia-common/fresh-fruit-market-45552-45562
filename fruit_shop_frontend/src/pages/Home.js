import React, { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/client";
import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page that lists products with search */
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    let active = true;
    fetchProducts().then((data) => {
      if (active) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.description || "").toLowerCase().includes(query) ||
        (p.category || "").toLowerCase().includes(query)
    );
  }, [q, products]);

  if (loading) return <Loading label="Fetching fresh fruits..." />;

  return (
    <main style={{ maxWidth: 1080, margin: "0 auto", padding: "16px" }}>
      <section
        style={{
          background: "linear-gradient(90deg,#2563EB0f,#F59E0B0f)",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, color: "#111827" }}>
          Welcome to Fresh Fruit Market
        </h2>
        <p style={{ color: "#4b5563", marginTop: 6 }}>
          Browse our curated selection of seasonal fruits. Ocean Professional palette,
          retro accents, and a delightful cart experience.
        </p>
        <div style={{ marginTop: 12 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search fruits, e.g., apple, citrus..."
            aria-label="Search products"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.12)",
              outline: "none",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04) inset",
            }}
          />
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
          gap: 16,
        }}
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={() => addItem(p, 1)} />
        ))}
      </section>
    </main>
  );
}
