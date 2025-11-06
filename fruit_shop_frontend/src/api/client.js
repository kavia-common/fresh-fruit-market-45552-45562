//
// API client for fruit shop frontend with ENV-driven base URL and mock fallback
//

// PUBLIC_INTERFACE
export function getEnv(name, fallback = undefined) {
  /** Get environment variable in React env space. */
  return process.env[name] ?? fallback;
}

const ENV_BASE =
  getEnv("REACT_APP_API_BASE") ||
  getEnv("REACT_APP_BACKEND_URL") ||
  getEnv("REACT_APP_FRONTEND_URL");

const DEFAULT_TIMEOUT_MS = 12000;

const MOCK_PRODUCTS = [
  {
    id: "apple-honeycrisp",
    name: "Honeycrisp Apple",
    price: 1.99,
    unit: "each",
    description: "Crisp, juicy and sweet with a hint of tartness — perfect for snacking.",
    image: "/assets/apple.png",
    stock: 100,
    category: "Apples",
  },
  {
    id: "banana-cavendish",
    name: "Cavendish Banana",
    price: 0.49,
    unit: "each",
    description: "Classic bananas with creamy texture and balanced sweetness.",
    image: "/assets/banana.png",
    stock: 200,
    category: "Bananas",
  },
  {
    id: "orange-navel",
    name: "Navel Orange",
    price: 0.99,
    unit: "each",
    description: "Seedless oranges with bright flavor and easy-to-peel skin.",
    image: "/assets/orange.png",
    stock: 150,
    category: "Citrus",
  },
  {
    id: "strawberry",
    name: "Strawberries",
    price: 3.99,
    unit: "pint",
    description: "Sweet and fragrant, great for desserts or a healthy snack.",
    image: "/assets/strawberry.png",
    stock: 80,
    category: "Berries",
  },
];

// INTERNAL fetch helper with timeout
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = DEFAULT_TIMEOUT_MS, ...rest } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const resp = await fetch(resource, { signal: controller.signal, ...rest });
    clearTimeout(id);
    return resp;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// PUBLIC_INTERFACE
export async function fetchProducts() {
  /** Fetch product list from backend; fall back to mock data on failure or missing ENV. */
  if (!ENV_BASE) {
    // No env available, return mock
    return Promise.resolve(MOCK_PRODUCTS);
  }
  try {
    const res = await fetchWithTimeout(`${ENV_BASE.replace(/\/+$/, "")}/products`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (_) {
    // Fallback to mock if API fails
    return MOCK_PRODUCTS;
  }
}

// PUBLIC_INTERFACE
export async function fetchProductById(id) {
  /** Fetch single product by id; fall back to mock data. */
  if (!ENV_BASE) {
    return Promise.resolve(MOCK_PRODUCTS.find((p) => p.id === id) || null);
  }
  try {
    const res = await fetchWithTimeout(
      `${ENV_BASE.replace(/\/+$/, "")}/products/${encodeURIComponent(id)}`,
      { headers: { "Content-Type": "application/json" } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (_) {
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  }
}

// PUBLIC_INTERFACE
export async function submitCheckout(orderPayload) {
  /**
   * Submit checkout payload; if API unavailable returns a mock confirmation.
   * orderPayload: { items: [{id, name, price, qty}], total }
   */
  const confirmation = {
    orderId: `MOCK-${Date.now()}`,
    status: "confirmed",
    estimatedDeliveryDays: 2,
  };

  if (!ENV_BASE) return confirmation;

  try {
    const res = await fetchWithTimeout(`${ENV_BASE.replace(/\/+$/, "")}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (_) {
    return confirmation;
  }
}
