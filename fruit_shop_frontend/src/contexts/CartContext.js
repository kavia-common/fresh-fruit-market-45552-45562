import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

// Helpers
function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to access cart API. */
  return useContext(CartContext);
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Provider for cart state including items and operations. */
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("ffm_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ffm_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...prev[idx], qty: prev[idx].qty + qty };
        return updated;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const updateQty = (id, qty) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)));
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  const subtotal = useMemo(
    () => round2(items.reduce((sum, it) => sum + it.price * it.qty, 0)),
    [items]
  );
  const shipping = useMemo(() => (subtotal > 25 || subtotal === 0 ? 0 : 4.99), [subtotal]);
  const tax = useMemo(() => round2(subtotal * 0.07), [subtotal]);
  const total = useMemo(() => round2(subtotal + tax + shipping), [subtotal, tax, shipping]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQty,
      removeItem,
      clear,
      subtotal,
      shipping,
      tax,
      total,
      count: items.reduce((n, it) => n + it.qty, 0),
    }),
    [items, subtotal, shipping, tax, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
