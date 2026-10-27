
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";

const products = [
  {
    name: "Raw Wildflower Honey",
    subtitle: "Pure golden goodness",
    description: "Natural sweetness for your everyday table and favourite recipes.",
    image: "https://therawkitchenuk.com/cdn/shop/files/1235199.png?v=1767044964&width=1200",
    alt: "Raw wildflower honey jar",
    tag: "FROM THE HIVES",
    price: 399,
  },
  {
    name: "Moringa Powder",
    subtitle: "Green goodness from nature",
    description: "A versatile green powder for smoothies, drinks and everyday recipes.",
    image: "https://www.pipagro.com/cdn/shop/files/E76E9555-3FDC-47EB-B9C9-75E7C2DC6FE6.png?v=1776944465",
    alt: "Moringa powder",
    tag: "FROM THE FARM",
    price: 249,
  },
  {
    name: "Organic Pulses & Dals",
    subtitle: "Wholesome everyday essentials",
    description: "Explore pulses and dals for everyday home-cooked meals.",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1000&q=85",
    alt: "Assorted pulses",
    tag: "FARM FRESH",
    price: 149,
  },
  {
    name: "Organic Dairy Products",
    subtitle: "Fresh goodness from the farm",
    description: "Explore dairy offerings such as milk, ghee, butter and paneer.",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1000&q=85",
    alt: "Dairy products",
    tag: "DAIRY",
    price: 199,
  },
  {
    name: "Farm-Fresh Cereals",
    subtitle: "Wholesome grains",
    description: "Explore everyday grains such as wheat, rice and millets.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=85",
    alt: "Wheat grains",
    tag: "FARM HARVEST",
    price: 129,
  },
  {
    name: "Fresh Fruits",
    subtitle: "Nature's colourful goodness",
    description: "Explore seasonal fruits and fresh farm produce.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=85",
    alt: "Fresh tropical fruits",
    tag: "SEASONAL",
    price: 99,
  },
  {
    name: "Sahiwal & Gir Cows",
    subtitle: "Indigenous Indian cattle breeds",
    description: "Enquire about cattle breeds and current farm availability.",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1000&q=85",
    alt: "Cattle on a farm",
    tag: "LIVESTOCK",
    price: 0,
  },
  {
    name: "Kadaknath Chicken & Eggs",
    subtitle: "Farm poultry",
    description: "Enquire about Kadaknath poultry and eggs, subject to availability.",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1000&q=85",
    alt: "Farm poultry",
    tag: "POULTRY",
    price: 0,
  },
];

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const addToCart = (product: (typeof products)[number]) => {
    if (product.price === 0) {
      window.open(
        "https://wa.me/?text=" +
          encodeURIComponent("Hello Naira Agro, I want to enquire about " + product.name + "."),
        "_blank"
      );
      return;
    }

    setCart((current) => {
      const existing = current.find((item) => item.name === product.name);

      if (existing) {
        return current.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const updateQuantity = (name: string, change: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (cart.length === 0) return;

    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join("\n");

    const message = `Hello Naira Agro, I want to place an order:\n\n${orderDetails}\n\nTotal: ₹${totalPrice}\n\nPlease share the next steps for delivery.`;

    window.open(
      "https://wa.me/?text=" + encodeURIComponent(message),
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-[#fcfbf7] text-[#244b35]">
      <div className="bg-[#244b35] px-4 py-3 text-center text-sm text-white">
        🌿 Natural goodness, from our farm to your home
      </div>

      <Header />

      <div className="mx-auto flex max-w-7xl justify-end px-6 pt-6">
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="rounded-full bg-[#244b35] px-5 py-3 font-semibold text-white hover:bg-green-800"
        >
          🛒 Cart ({totalItems})
        </button>
      </div>

      {cartOpen && (
        <section className="mx-auto mt-5 max-w-3xl rounded-2xl border border-green-900/10 bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="rounded-full px-3 py-1 text-xl hover:bg-gray-100"
              aria-label="Close cart"
            >
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="mt-5 text-gray-600">Your cart is empty. Add some products!</p>
          ) : (
            <>
              <div className="mt-5 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-wrap items-center justify-between gap-3 border-b pb-4"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ₹{item.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.name, -1)}
                        className="h-8 w-8 rounded-full border hover:bg-gray-100"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.name, 1)}
                        className="h-8 w-8 rounded-full border hover:bg-gray-100"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                      <span className="min-w-20 text-right font-semibold">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-right text-xl font-bold">
                Total: ₹{totalPrice}
              </p>

              <button
                onClick={placeOrder}
                className="mt-5 w-full rounded-full bg-[#244b35] px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Place Order via WhatsApp →
              </button>
              <p className="mt-3 text-xs text-gray-500">
                Your order details will open in WhatsApp. The order is not confirmed until the farm team responds.
              </p>
            </>
          )}
        </section>
      )}

      <section className="px-6 py-16 text-center md:py-24">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#71965b]">
          Explore Naira Agro
        </p>
        <h1 className="mt-5 text-4xl font-bold md:text-6xl">
          Products from Nature
        </h1>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
          Explore our collection of honey, moringa powder and farm-related products.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
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
      </section>

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

      <footer className="bg-[#193726] px-6 py-7 text-center text-sm text-white/70">
        © 2026 Naira Agro. All rights reserved.
      </footer>
    </main>
  );
}
