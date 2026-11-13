
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";

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

const products: Product[] = [
  {
    name: "Raw Wildflower Honey",
    subtitle: "Pure golden goodness",
    description: "Natural sweetness for your everyday table and favourite recipes.",
    image: "https://therawkitchenuk.com/cdn/shop/files/1235199.png?v=1767044964&width=1200",
    alt: "Raw wildflower honey jar",
    tag: "FROM THE HIVES",
    price: 399,
    featured: true,
    featuredOrder: 1,
    category: "Honey",
  },
  {
    name: "Moringa Powder",
    subtitle: "Green goodness from nature",
    description: "A versatile green powder for smoothies, drinks and everyday recipes.",
    image: "https://www.pipagro.com/cdn/shop/files/E76E9555-3FDC-47EB-B9C9-75E7C2DC6FE6.png?v=1776944465",
    alt: "Moringa powder",
    tag: "FROM THE FARM",
    price: 249,
    featured: true,
    featuredOrder: 2,
    category: "Organic Foods",
  },
  {
    name: "Organic Pulses & Dals",
    subtitle: "Wholesome everyday essentials",
    description: "Explore pulses and dals for everyday home-cooked meals.",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1000&q=85",
    alt: "Assorted pulses",
    tag: "FARM FRESH",
    price: 149,
    featured: true,
    featuredOrder: 3,
    category: "Organic Foods",
  },
  {
    name: "Organic Dairy Products",
    subtitle: "Fresh goodness from the farm",
    description: "Explore dairy offerings such as milk, ghee, butter and paneer.",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1000&q=85",
    alt: "Dairy products",
    tag: "DAIRY",
    price: 199,
    featured: false,
    featuredOrder: 4,
    category: "Dairy",
  },
  {
    name: "Farm-Fresh Cereals",
    subtitle: "Wholesome grains",
    description: "Explore everyday grains such as wheat, rice and millets.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=85",
    alt: "Wheat grains",
    tag: "FARM HARVEST",
    price: 129,
    featured: false,
    featuredOrder: 5,
    category: "Grains",
  },
  {
    name: "Fresh Fruits",
    subtitle: "Nature's colourful goodness",
    description: "Explore seasonal fruits and fresh farm produce.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=85",
    alt: "Fresh tropical fruits",
    tag: "SEASONAL",
    price: 99,
    featured: false,
    featuredOrder: 6,
    category: "Fruits",
  },
  {
    name: "Sahiwal & Gir Cows",
    subtitle: "Indigenous Indian cattle breeds",
    description: "Enquire about cattle breeds and current farm availability.",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1000&q=85",
    alt: "Cattle on a farm",
    tag: "LIVESTOCK",
    price: 0,
    featured: false,
    featuredOrder: 7,
    category: "Livestock",
  },
  {
    name: "Kadaknath Chicken & Eggs",
    subtitle: "Farm poultry",
    description: "Enquire about Kadaknath poultry and eggs, subject to availability.",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1000&q=85",
    alt: "Farm poultry",
    tag: "POULTRY",
    price: 0,
    featured: false,
    featuredOrder: 8,
    category: "Poultry",
  },
];

const categories = [
  "All Products",
  "Honey",
  "Organic Foods",
  "Dairy",
  "Grains",
  "Fruits",
  "Livestock",
  "Poultry",
];

export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
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

  // Header icon opens this cart drawer
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

  // Close drawer with Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setCheckoutOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  // Add to cart - do not open drawer automatically
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

  // Search, category, price and sorting
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
  }, [searchTerm, selectedCategory, minPrice, maxPrice, sortBy]);

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

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
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

    if (
      !customer.address.trim() ||
      customer.address.trim().length < 10
    ) {
      newErrors.address =
        "Enter a complete address (minimum 10 characters)";
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

    if (!validateForm() || cart.length === 0) return;

    const orderDetails = cart
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

Total: ₹${totalPrice}

Please confirm my order and delivery details.`;

    window.open(
      "https://wa.me/?text=" + encodeURIComponent(message),
      "_blank"
    );

    setCheckoutOpen(false);
    setCartOpen(false);
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
          
        </div>
      )}

      {/* Announcement */}
      <div className="bg-[#244b35] px-4 py-3 text-center text-sm text-white">
        🌿 Natural goodness, from our farm to your home
      </div>

      <Header />

      {/* CART DRAWER - only opens from header icon */}
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

      {/* CHECKOUT */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/60 p-4">
          <div className="my-auto w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Checkout Details</h2>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="text-2xl text-gray-500"
              >
                ×
              </button>
            </div>

            <p className="mb-6 mt-2 text-sm text-gray-500">
              Please enter your details to continue.
            </p>

            <form onSubmit={placeOrder} noValidate className="space-y-4">
              <div>
                <label className="mb-1 block font-medium">Full Name *</label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border p-3 outline-none focus:border-green-700"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block font-medium">
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
                  className="w-full rounded-xl border p-3 outline-none focus:border-green-700"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block font-medium">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  className="w-full rounded-xl border p-3 outline-none focus:border-green-700"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block font-medium">
                  Delivery Address *
                </label>
                <textarea
                  rows={3}
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  placeholder="House number, street, city, PIN code"
                  className="w-full rounded-xl border p-3 outline-none focus:border-green-700"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-[#edf2e7] p-4">
                <p className="font-semibold">Order Total: ₹{totalPrice}</p>
                <p className="mt-1 text-xs text-gray-600">
                  Order confirmation will be handled by the Naira Agro team.
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#244b35] px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Confirm & Continue to WhatsApp →
              </button>
            </form>
          </div>
        </div>
      )}

      
      
      {/* SEARCH */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>

          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search honey, moringa, fruits, dairy..."
            className="w-full rounded-2xl border border-green-900/20 bg-white py-4 pl-14 pr-5 text-[#244b35] shadow-sm outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
          />
        </div>
      </section>

      {/* PRODUCTS + LEFT FILTER SIDEBAR */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="mb-5 flex w-full items-center justify-between rounded-xl border border-green-900/15 bg-white px-5 py-3 font-semibold text-[#244b35] shadow-sm lg:hidden"
        >
          <span>☰ Filters & Sorting</span>
          <span>{mobileFiltersOpen ? "−" : "+"}</span>
        </button>

        <div className="flex flex-col items-start gap-8 lg:flex-row">
          {/* LEFT SIDEBAR */}
          <aside
            className={`w-full shrink-0 lg:sticky lg:top-24 lg:block lg:w-[270px] ${
              mobileFiltersOpen ? "block" : "hidden"
            }`}
          >
            <div className="rounded-2xl border border-green-900/10 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-semibold text-[#71965b] hover:underline"
                >
                  Clear All
                </button>
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
                    Maximum price must be greater than or equal to minimum price.
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
            </div>
          </aside>

          {/* RIGHT PRODUCT AREA */}
          <div className="min-w-0 w-full flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-bold"></h2>
              <p className="mt-1 text-sm text-gray-600">
                
              </p>
            </div>

            {invalidPriceRange ? (
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
                    className="overflow-hidden rounded-3xl border border-green-900/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative flex h-80 items-center justify-center overflow-hidden bg-[#f5f3e9] p-3">
                      {failedImages.includes(product.name) ? (
                        <div className="px-6 text-center text-sm text-gray-500">
                          Image could not load. Please check your internet connection.
                        </div>
                      ) : (
                        <img
                          src={product.image}
                          alt={product.alt}
                          loading="lazy"
                          className="h-full w-full rounded-xl object-contain"
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
                          <span className="ml-2 text-sm font-normal text-gray-500">
                            (sample price)
                          </span>
                        </p>
                      ) : (
                        <p className="mt-5 text-lg font-semibold">
                          Price on enquiry
                        </p>
                      )}

                      <button
                        onClick={() => addToCart(product)}
                        className="mt-6 w-full rounded-full bg-[#244b35] px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                      >
                        {product.price > 0
                          ? "Add to Cart +"
                          : "Enquire About Product →"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#edf2e7] px-6 py-14 text-center">
        <h2 className="text-3xl font-bold">Goodness worth sharing</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
          Have questions about our products? Get in touch with the Naira Agro team.
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
