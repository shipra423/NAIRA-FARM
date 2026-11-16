"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import { api } from "../../lib/api";

type Product = {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  tag: string;
  price: number;
  featured: boolean;
  featuredOrder: number;
  category: string;
};

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type Customer = {
  name: string;
  phone: string;
  address: string;
  email: string;
};

// Webrix API ka product format
type ApiProduct = {
  id: number;
  name: string;
  price: string;
  discounted_price: string | null;
  is_featured: boolean;
  image: string | null;
  short_description?: string;
  category_detail?: { name: string } | null;
};

// API product ko page ke Product format mein badalta hai
function mapProduct(p: ApiProduct, index: number): Product {
  const category = p.category_detail?.name || "Other";

  return {
    name: p.name,
    subtitle: category,
    description: p.short_description || "",
    image: p.image || "",
    alt: p.name,
    tag: category.toUpperCase(),
    price: Number(p.discounted_price || p.price) || 0,
    featured: p.is_featured,
    featuredOrder: index + 1,
    category,
  };
}

export default function ProductsPage() {
  // Products from Webrix API
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("featured");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("5000");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<Customer>>({});

  // Fetch products from API
  useEffect(() => {
    api("/products/")
      .then((data) => {
        const list = (data.results || []) as ApiProduct[];
        setProducts(list.map(mapProduct));
      })
      .catch(() =>
        setLoadError("Products could not be loaded. Please try again.")
      )
      .finally(() => setLoading(false));
  }, []);

  // Categories come from the products
  const categories = useMemo(
    () => [
      "All Products",
      ...Array.from(new Set(products.map((p) => p.category))),
    ],
    [products]
  );

  // Load saved cart
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("naira-agro-cart");

      if (savedCart) {
        const parsedCart: CartItem[] = JSON.parse(savedCart);

        const uniqueCart = parsedCart.reduce<CartItem[]>((items, item) => {
          const existing = items.find(
            (cartItem) => cartItem.name === item.name
          );

          if (!existing) items.push(item);

          return items;
        }, []);

        setCart(uniqueCart);
      }
    } catch {
      localStorage.removeItem("naira-agro-cart");
    }

    setHydrated(true);
  }, []);

  // Header icon opens cart drawer
  useEffect(() => {
    const openCart = () => setCartOpen(true);

    window.addEventListener("openNairaCart", openCart);

    return () => {
      window.removeEventListener("openNairaCart", openCart);
    };
  }, []);

  // Save cart and update header count
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("naira-agro-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [cart, hydrated]);

  // Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setCheckoutOpen(false);
        setMobileFiltersOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Prevent background scrolling
  useEffect(() => {
    if (mobileFiltersOpen || checkoutOpen || cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen, checkoutOpen, cartOpen]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  // Add to cart
  const addToCart = (product: Product) => {
    if (product.price === 0) {
      window.open(
        "https://wa.me/?text=" +
          encodeURIComponent(
            "Hello Naira Agro, I want to enquire about " + product.name
          ),
        "_blank"
      );
      return;
    }

    if (cart.some((item) => item.name === product.name)) {
      showToast(`${product.name} is already in your cart!`);
      return;
    }

    setCart((current) => {
      if (current.some((item) => item.name === product.name)) {
        return current;
      }

      return [
        ...current,
        {
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });

    showToast(`${product.name} added to cart successfully!`);
  };

  // Direct Buy Now
  const buyNow = (product: Product) => {
    if (product.price === 0) {
      window.open(
        "https://wa.me/?text=" +
          encodeURIComponent(
            "Hello Naira Agro, I want to enquire about " + product.name
          ),
        "_blank"
      );
      return;
    }

    setCheckoutItems([
      {
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    ]);

    setCartOpen(false);
    setCheckoutOpen(true);
  };

  // Direct checkout from Home Page Buy Now buttons
  // Runs only after products are loaded from the API
  useEffect(() => {
    if (products.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const productName = params.get("buyNow");

    if (!productName) return;

    const selectedProduct = products.find(
      (product) => product.name === productName
    );

    if (!selectedProduct) return;

    // Remove query parameter after reading it
    window.history.replaceState({}, "", window.location.pathname);

    // Open full-screen checkout directly
    buyNow(selectedProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const updateQuantity = (name: string, change: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + change),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (name: string) => {
    setCart((current) => current.filter((item) => item.name !== name));
    showToast("Product removed from cart");
  };

  // Combined search, category, price and sorting
  const filteredProducts = useMemo(() => {
    const min = minPrice.trim() === "" ? 0 : Number(minPrice);
    const max = maxPrice.trim() === "" ? Infinity : Number(maxPrice);
    const search = searchTerm.toLowerCase().trim();

    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          product.subtitle.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search);

        const matchesCategory =
          selectedCategory === "All Products" ||
          product.category === selectedCategory;

        const matchesPrice =
          product.price === 0
            ? min === 0 && max === 5000
            : product.price >= min && product.price <= max;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "featured":
            if (a.featured !== b.featured) {
              return Number(b.featured) - Number(a.featured);
            }
            return a.featuredOrder - b.featuredOrder;

          case "low":
            if (a.price === 0) return 1;
            if (b.price === 0) return -1;
            return a.price - b.price;

          case "high":
            if (a.price === 0) return 1;
            if (b.price === 0) return -1;
            return b.price - a.price;

          case "az":
            return a.name.localeCompare(b.name);

          default:
            return 0;
        }
      });
  }, [products, searchTerm, selectedCategory, minPrice, maxPrice, sortBy]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Products");
    setMinPrice("0");
    setMaxPrice("5000");
    setSortBy("featured");
  };

  const invalidPriceRange =
    minPrice !== "" &&
    maxPrice !== "" &&
    Number(minPrice) > Number(maxPrice);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Checkout total - independent of cart
  const checkoutTotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Checkout validation
  const validateForm = () => {
    const newErrors: Partial<Customer> = {};

    if (!customer.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!/^[6-9]\d{9}$/.test(customer.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!customer.address.trim() || customer.address.trim().length < 10) {
      newErrors.address = "Enter a complete address (minimum 10 characters)";
    }

    if (
      customer.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // WhatsApp order
  const placeOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm() || checkoutItems.length === 0) return;

    const orderDetails = checkoutItems
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join("\n");

    const message = `Hello Naira Agro, I want to place an order:

Customer Name: ${customer.name}

Mobile: ${customer.phone}

Email: ${customer.email || "Not provided"}

Address: ${customer.address}

Products:

${orderDetails}

Total: ₹${checkoutTotal}

Please confirm my order and delivery details.`;

    window.open("https://wa.me/?text=" + encodeURIComponent(message), "_blank");

    setCheckoutOpen(false);
    setCartOpen(false);
    setCheckoutItems([]);

    showToast("Order details opened in WhatsApp!");
  };

  return (
    <main className="min-h-screen bg-[#fcfbf7] text-[#244b35]">
      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-24 z-[120] flex max-w-[calc(100%-2.5rem)] items-center gap-3 rounded-2xl border border-green-200 bg-white px-5 py-4 text-[#244b35] shadow-2xl"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl text-green-700">
            ✓
          </span>
          {toast}
        </div>
      )}

      {/* Announcement */}
      <div className="bg-[#244b35] px-4 py-3 text-center text-sm text-white">
        🌿 Natural goodness, from our farm to your home
      </div>

      <Header />

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/40"
          onClick={() => setCartOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b pb-5">
              <div>
                <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
                <p className="text-sm text-gray-500">
                  {totalItems} items in your cart
                </p>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="text-3xl text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center">
                <span className="text-5xl">🛒</span>
                <p className="mt-4 font-semibold">Your cart is empty</p>

                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-5 rounded-full bg-[#244b35] px-6 py-3 text-white"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-5 overflow-y-auto py-6">
                  {cart.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-3 border-b pb-5"
                    >
                      <div className="min-w-0">
                        <h3 className="font-bold">{item.name}</h3>

                        <p className="text-sm text-gray-500">
                          ₹{item.price} each
                        </p>

                        <button
                          onClick={() => removeItem(item.name)}
                          className="mt-2 text-sm text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.name, -1)}
                          aria-label={`Decrease ${item.name} quantity`}
                          className="h-8 w-8 rounded-full border"
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.name, 1)}
                          aria-label={`Increase ${item.name} quantity`}
                          className="h-8 w-8 rounded-full border"
                        >
                          +
                        </button>
                      </div>

                      <p className="shrink-0 font-bold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-5">
                  <div className="mb-5 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>

                  <button
                    onClick={() => {
                      setCheckoutItems([...cart]);
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                    className="w-full rounded-full bg-[#244b35] py-4 font-bold text-white hover:bg-green-800"
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* FULL SCREEN CHECKOUT */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-[110] h-screen w-full overflow-y-auto bg-[#fcfbf7]">
          <div className="min-h-screen w-full px-5 py-8 md:px-12 lg:px-20">
            <div className="mx-auto max-w-6xl">
              {/* Checkout Header */}
              <div className="mb-8 flex items-center justify-between border-b border-green-900/10 pb-6">
                <div>
                  <p className="font-semibold tracking-widest text-[#71965b]">
                    NAIRA AGRO
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">Checkout Details</h2>

                  <p className="mt-2 text-gray-500">
                    Complete your details to place your order.
                  </p>
                </div>

                <button
                  onClick={() => setCheckoutOpen(false)}
                  aria-label="Close checkout"
                  className="rounded-full border px-4 py-2 text-2xl text-gray-500 hover:bg-gray-100"
                >
                  ×
                </button>
              </div>

              <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
                {/* Customer Form */}
                <div className="rounded-3xl bg-white p-6 shadow-sm md:p-9">
                  <h3 className="mb-6 text-2xl font-bold">
                    Delivery Information
                  </h3>

                  <form onSubmit={placeOrder} noValidate className="space-y-5">
                    <div>
                      <label className="mb-2 block font-medium">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                      />

                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block font-medium">
                        Mobile Number *
                      </label>

                      <input
                        type="tel"
                        maxLength={10}
                        value={customer.phone}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            phone: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        placeholder="10-digit mobile number"
                        className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                      />

                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block font-medium">
                        Email (Optional)
                      </label>

                      <input
                        type="email"
                        value={customer.email}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            email: e.target.value,
                          })
                        }
                        placeholder="Enter email address"
                        className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                      />

                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block font-medium">
                        Delivery Address *
                      </label>

                      <textarea
                        rows={4}
                        value={customer.address}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            address: e.target.value,
                          })
                        }
                        placeholder="House number, street, city, PIN code"
                        className="w-full resize-y rounded-xl border border-gray-200 p-4 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
                      />

                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#244b35] px-6 py-4 font-semibold text-white transition hover:bg-green-800"
                    >
                      Confirm & Continue to WhatsApp →
                    </button>

                    <p className="text-center text-xs text-gray-500">
                      Your order details will be shared with Naira Agro through
                      WhatsApp.
                    </p>
                  </form>
                </div>

                {/* Order Summary */}
                <div className="h-fit rounded-3xl bg-white p-6 shadow-sm md:p-8">
                  <h3 className="mb-6 text-2xl font-bold">Order Summary</h3>

                  <div className="space-y-5">
                    {checkoutItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex justify-between gap-4 border-b border-gray-100 pb-5"
                      >
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>

                          <p className="mt-1 text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            ₹{item.price} each
                          </p>
                        </div>

                        <p className="font-bold">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 border-t border-gray-200 pt-5">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{checkoutTotal}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span>To be confirmed</span>
                    </div>

                    <div className="flex justify-between border-t border-gray-200 pt-4 text-xl font-bold">
                      <span>Total</span>
                      <span>₹{checkoutTotal}</span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-[#edf2e7] p-5">
                    <p className="font-semibold">
                      🌿 Thank you for choosing Naira Agro!
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Order confirmation and delivery details will be handled by
                      the Naira Agro team.
                    </p>
                  </div>

                  <button
                    onClick={() => setCheckoutOpen(false)}
                    className="mt-6 w-full rounded-full border border-[#244b35] py-3 font-semibold text-[#244b35] transition hover:bg-[#edf2e7]"
                  >
                    ← Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMBINED SEARCH + FILTER */}
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex flex-col gap-3 rounded-2xl border border-green-900/10 bg-white p-4 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
              🔍
            </span>

            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search honey, moringa, fruits, dairy..."
              className="w-full rounded-xl border border-green-900/20 bg-[#fcfbf7] py-3 pl-12 pr-4 text-[#244b35] outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#244b35] px-7 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            ☰ Filters & Sorting
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
          <span>Showing {filteredProducts.length} products</span>

          <button
            onClick={clearAllFilters}
            className="font-semibold text-[#71965b] hover:underline"
          >
            Clear Search & Filters ↺
          </button>
        </div>
      </section>

      {/* PRODUCTS + FILTER DRAWER */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
        {/* FILTER DRAWER */}
        <div
          className={`fixed inset-0 z-[90] transition-all duration-500 ease-out ${
            mobileFiltersOpen
              ? "visible bg-black/40 opacity-100 backdrop-blur-sm"
              : "invisible bg-black/0 opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default"
          />

          <aside
            className={`absolute left-0 top-0 flex h-full w-[88%] max-w-[380px] flex-col overflow-y-auto bg-white p-5 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="rounded-2xl border border-green-900/10 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>

                <div className="flex items-center gap-4">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm font-semibold text-[#71965b] hover:underline"
                  >
                    Clear All
                  </button>

                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Close filters"
                    className="text-3xl leading-none text-gray-500 hover:text-black"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="mb-4 font-bold">Shop by Category</h3>

                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-700 hover:text-[#244b35]"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 accent-[#244b35]"
                      />

                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div className="my-6 border-t border-gray-100" />

              {/* Price */}
              <div>
                <h3 className="mb-4 font-bold">Filter by Price (₹)</h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Minimum
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Min price"
                      className="w-full rounded-xl border border-green-900/20 px-3 py-3 text-sm outline-none focus:border-green-700"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Maximum
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max price"
                      className="w-full rounded-xl border border-green-900/20 px-3 py-3 text-sm outline-none focus:border-green-700"
                    />
                  </div>
                </div>

                {invalidPriceRange && (
                  <p className="mt-2 text-xs text-red-600">
                    Maximum price must be greater than or equal to minimum
                    price.
                  </p>
                )}
              </div>

              <div className="my-6 border-t border-gray-100" />

              {/* Sorting */}
              <div>
                <h3 className="mb-3 font-bold">Sort Products</h3>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-xl border border-green-900/20 bg-white px-4 py-3 text-sm outline-none focus:border-green-700"
                >
                  <option value="featured">Featured Products</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="az">Name: A to Z</option>
                </select>
              </div>

              <button
                onClick={clearAllFilters}
                className="mt-6 w-full rounded-full border border-[#244b35] px-5 py-2.5 text-sm font-semibold text-[#244b35] transition hover:bg-[#edf2e7]"
              >
                Clear All Filters ↺
              </button>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                disabled={invalidPriceRange}
                className="mt-4 w-full rounded-full bg-[#244b35] px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>
          </aside>
        </div>

        {/* PRODUCTS AREA */}
        <div className="min-w-0 w-full flex-1">
          <div className="mb-6">
            <h2 className="text-xl font-bold"></h2>

            <p className="mt-1 text-sm text-gray-600"></p>
          </div>

          {loading ? (
            <p className="rounded-xl bg-white p-8 text-center text-gray-600">
              Loading products...
            </p>
          ) : loadError ? (
            <p className="rounded-xl bg-white p-8 text-center text-red-600">
              {loadError}
            </p>
          ) : invalidPriceRange ? (
            <p className="rounded-xl bg-white p-8 text-center text-gray-600">
              Maximum price must be greater than or equal to minimum price.
            </p>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
              <p className="text-4xl">🌿</p>

              <h2 className="mt-4 text-2xl font-bold">No Products Found</h2>

              <p className="mt-3 text-gray-500">
                Try another search or category.
              </p>

              <button
                onClick={clearAllFilters}
                className="mt-6 rounded-full bg-[#244b35] px-6 py-3 font-semibold text-white"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <article
                  key={product.name}
                  className="group overflow-hidden rounded-3xl border border-green-900/10 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Product Image */}
                  <div className="relative flex h-80 items-center justify-center overflow-hidden bg-[#f5f3e9] p-3">
                    {!product.image || failedImages.includes(product.name) ? (
                      <div className="px-6 text-center text-sm text-gray-500">
                        {product.image
                          ? "Image could not load. Please check your internet connection."
                          : "No image available"}
                      </div>
                    ) : (
                      <img
                        src={product.image}
                        alt={product.alt}
                        loading="lazy"
                        className="h-full w-full rounded-xl object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={() =>
                          setFailedImages((current) =>
                            current.includes(product.name)
                              ? current
                              : [...current, product.name]
                          )
                        }
                      />
                    )}

                    <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold tracking-wider text-[#244b35]">
                      {product.tag}
                    </span>

                    {product.featured && (
                      <span className="absolute right-5 top-5 rounded-full bg-[#244b35] px-3 py-2 text-xs font-bold text-white">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-7 md:p-9">
                    <p className="text-sm font-semibold text-[#71965b]">
                      {product.subtitle}
                    </p>

                    <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                      {product.name}
                    </h2>

                    <p className="mt-4 leading-7 text-gray-600">
                      {product.description}
                    </p>

                    {product.price > 0 ? (
                      <p className="mt-5 text-2xl font-bold">
                        ₹{product.price}
                      </p>
                    ) : (
                      <p className="mt-5 text-lg font-semibold">
                        Price on enquiry
                      </p>
                    )}

                    {/* Add to Cart */}
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-6 w-full rounded-full bg-[#244b35] px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                      {product.price > 0
                        ? "Add to Cart +"
                        : "Enquire About Product →"}
                    </button>

                    {/* Buy Now */}
                    {product.price > 0 && (
                      <button
                        onClick={() => buyNow(product)}
                        className="mt-3 w-full rounded-full border-2 border-[#244b35] bg-white px-6 py-3 font-semibold text-[#244b35] transition hover:bg-[#edf2e7]"
                      >
                        Buy Now →
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#edf2e7] px-6 py-14 text-center">
        <h2 className="text-3xl font-bold">Goodness worth sharing</h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
          Have questions about our products? Get in touch with the Naira Agro
          team.
        </p>

        <Link
          href="/#contact"
          className="mt-6 inline-flex rounded-full border border-[#244b35] px-6 py-3 font-semibold hover:bg-white"
        >
          Contact Us
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#193726] px-6 py-7 text-center text-sm text-white/70">
        © 2026 Naira Agro. All rights reserved.
      </footer>
    </main>
  );
}