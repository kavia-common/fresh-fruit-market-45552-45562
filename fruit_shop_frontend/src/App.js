import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

// PUBLIC_INTERFACE
function App() {
  /** Application shell with contexts and hash-based routing */
  return (
    <ThemeProvider>
      <CartProvider>
        <div
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            background: "var(--bg)",
            color: "var(--text)",
          }}
        >
          <HashRouter>
            <Header />
            <div className="retro-divider" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </HashRouter>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
