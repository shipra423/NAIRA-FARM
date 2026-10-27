"use client";
import Link from "next/link";
import Header from "../../components/Header";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fcfbf7] text-[#244b35]">
      <div className="bg-[#244b35] px-4 py-3 text-center text-sm text-white">
        🌿 We'd love to hear from you
      </div>

      <Header />

      <section className="px-6 py-16 text-center md:py-20">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#71965b]">
          Get in Touch
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Let's Connect
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
          Have questions about our raw wildflower honey or moringa powder?
          Contact our team and tell us how we can help.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 md:grid-cols-2">
        <div className="rounded-3xl bg-[#244b35] p-8 text-white md:p-10">
          <p className="font-semibold uppercase tracking-widest text-green-200">
            Contact Naira Agro
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            We're here to help.
          </h2>

          <p className="mt-4 leading-7 text-white/80">
            For product enquiries and general questions, send us a message on
            WhatsApp.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🍯</span>
              <div>
                <h3 className="font-bold">Product enquiries</h3>
                <p className="mt-1 text-sm leading-6 text-white/75">
                  Ask us about honey and moringa powder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">💬</span>
              <div>
                <h3 className="font-bold">WhatsApp</h3>
                <p className="mt-1 text-sm leading-6 text-white/75">
                  Send a message directly to our team.
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex rounded-full bg-white px-6 py-4 font-semibold text-[#244b35] hover:bg-green-50"
          >
            Message Us on WhatsApp →
          </a>

          <p className="mt-4 text-xs text-white/60">
            Add your business WhatsApp number to activate direct contact.
          </p>
        </div>

        <div className="rounded-3xl border border-green-900/10 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold">Quick Enquiry</h2>

          <p className="mt-2 leading-7 text-gray-600">
            Choose a product below to prepare an enquiry message.
          </p>

          <form
            action="https://wa.me/"
            method="get"
            className="mt-7 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();

              const form = event.currentTarget;
              const data = new FormData(form);
              const name = String(data.get("name") || "");
              const product = String(data.get("product") || "");
              const message = String(data.get("message") || "");

              const text = `Hello Naira Agro!%0AName: ${encodeURIComponent(name)}%0AProduct: ${encodeURIComponent(product)}%0AMessage: ${encodeURIComponent(message)}`;

              window.open(`https://wa.me/?text=${text}`, "_blank");
            }}
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-700"
              />
            </div>

            <div>
              <label htmlFor="product" className="mb-2 block text-sm font-semibold">
                Interested Product
              </label>
              <select
                id="product"
                name="product"
                required
                defaultValue=""
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-green-700"
              >
                <option value="" disabled>
                  Select a product
                </option>
                <option value="Raw Wildflower Honey">Raw Wildflower Honey</option>
                <option value="Moringa Powder">Moringa Powder</option>
                <option value="Both Products">Both Products</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Write your enquiry here..."
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-700"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#244b35] px-6 py-4 font-semibold text-white hover:bg-green-800"
            >
              Prepare WhatsApp Enquiry →
            </button>
          </form>
        </div>
      </section>

      <section className="bg-[#edf2e7] px-6 py-12 text-center">
        <h2 className="text-2xl font-bold">Explore Naira Agro</h2>
        <div className="mt-5 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-full border border-green-900/20 px-5 py-3 hover:bg-white">
            Home
          </Link>
          <Link href="/about" className="rounded-full border border-green-900/20 px-5 py-3 hover:bg-white">
            Our Farm
          </Link>
          <Link href="/products" className="rounded-full border border-green-900/20 px-5 py-3 hover:bg-white">
            Products
          </Link>
        </div>
      </section>

     <footer className="bg-[#193726] px-6 py-7 text-center text-sm text-white/70">
  © 2026 Naira Agro. All rights reserved.
</footer>
    </main>
  );
}
