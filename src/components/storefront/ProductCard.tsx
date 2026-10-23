
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";

import type { Product } from "../../data/products";
import { formatCurrency } from "../../lib/currency";
import { useCart } from "../../lib/cart";

export function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addItem, ready } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e7e1]">
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="block h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {product.tag && (
          <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-widest">
            {product.tag}
          </span>
        )}

        <button
          type="button"
          disabled={!ready || product.stock === 0}
          onClick={() => {
            addItem(product.id);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1200);
          }}
          className="absolute bottom-4 right-4 flex h-12 min-w-12 items-center justify-center gap-2 bg-white px-3 text-black transition-colors hover:bg-[#d8ff67] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Add ${product.name} to cart`}
        >
          {added ? (
            <span className="text-xs font-medium">Added</span>
          ) : (
            <Plus size={20} />
          )}
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            {product.category}
          </p>

          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="flex items-center gap-2 text-lg font-medium tracking-tight hover:underline"
          >
            {product.name}
            <ArrowUpRight
              size={15}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>
        </div>

        <span className="whitespace-nowrap text-sm font-medium">
          {formatCurrency(product.price)}
        </span>
      </div>
    </article>
  );
}
