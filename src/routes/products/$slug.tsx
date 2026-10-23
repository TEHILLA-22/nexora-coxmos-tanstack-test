
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";

import { products, getProductBySlug } from "../../data/products";
import { StoreHeader } from "../../components/storefront/StoreHeader";
import { ProductCard } from "../../components/storefront/ProductCard";
import { formatCurrency } from "../../lib/currency";
import { useCart } from "../../lib/cart";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const { addItem, ready } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const relatedProducts = products
    .filter((item) =>
      item.category === product.category &&
      item.id !== product.id
    )
    .slice(0, 3);

  function handleAdd() {
    addItem(product.id, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#171914]">
      <StoreHeader />

      <main className="mx-auto max-w-[1600px] px-6 py-10 md:px-12">
        <Link
          to="/products"
          className="mb-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-neutral-600 hover:text-black"
        >
          <ArrowLeft size={16} /> Back to collection
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="aspect-[4/5] overflow-hidden bg-[#e9e7e1]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center lg:py-12">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-500">
              {product.category} / NEXORA
            </p>

            <h1 className="max-w-xl text-5xl font-medium leading-[0.98] tracking-[-0.065em] md:text-7xl">
              {product.name}
            </h1>

            <p className="mt-8 text-2xl font-medium">
              {formatCurrency(product.price)}
            </p>

            <div className="my-10 h-px bg-black/15" />

            <p className="max-w-lg text-base leading-8 text-neutral-600">
              {product.description}
            </p>

            <p className="mt-8 text-xs font-semibold uppercase tracking-widest">
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </p>

            {product.stock > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <div className="flex h-16 items-center border border-black/20">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    className="px-5"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-8 text-center font-medium">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) =>
                        Math.min(product.stock, value + 1)
                      )
                    }
                    className="px-5"
                    aria-label="Increase quantity"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!ready}
                  className="flex h-16 flex-1 items-center justify-center gap-4 bg-[#171914] px-8 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#343b2f] disabled:opacity-50"
                >
                  <ShoppingBag size={19} />
                  {added ? "Added to bag" : "Add to bag"}
                  <ArrowRight size={17} />
                </button>
              </div>
            )}

            <div className="mt-12 flex items-center gap-4 border-t border-black/10 pt-8 text-sm text-neutral-600">
              <Truck size={22} strokeWidth={1.4} />
              Delivery details confirmed at checkout.
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="py-24">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-4xl tracking-[-0.055em] md:text-6xl">
                You may also like.
              </h2>
              <Link
                to="/products"
                className="hidden text-xs font-bold uppercase tracking-widest sm:block"
              >
                View all
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
