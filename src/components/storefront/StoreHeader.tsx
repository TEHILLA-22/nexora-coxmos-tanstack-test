
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/about", label: "Our story" },
  { to: "/contact", label: "Contact" },
] as const;

export function StoreHeader() {
  const { count, ready } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-[#171914] text-white">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
        <Link
          to="/"
          className="text-2xl font-black tracking-[-0.08em]"
        >
          NEXORA<span className="text-[#d8ff67]">.</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{
                className: "text-[#d8ff67]",
              }}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-[#d8ff67]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            to="/cart"
            className="relative flex items-center gap-2"
            aria-label="View shopping cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="text-xs" aria-live="polite">
              {ready ? count : 0}
            </span>
          </Link>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-6 border-t border-white/15 px-6 py-8 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
