"use client";

import Link from "next/link";
import { useState } from "react";
import { Leaf, Menu, ShoppingBag, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "Our Farm", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-green-900/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-800">
            <Leaf size={23} />
          </span>
          <span className="text-2xl font-bold text-[#244b35]">
            Naira <span className="text-[#71965b]">Agro.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm hover:text-green-700">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/products" aria-label="Browse products" className="rounded-full bg-[#244b35] p-3 text-white">
            <ShoppingBag size={20} />
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} className="rounded-lg border p-2 md:hidden">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t p-4 md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-4 py-3 hover:bg-green-50">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}