

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { StoreHeader } from "../components/storefront/StoreHeader";
import { products } from "../data/products";
import { useCart } from "../lib/cart";
import { formatCurrency } from "../lib/currency";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const {
    items,
    ready,
    count,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const cartProducts = items.flatMap((item) => {
    const product = products.find(
      (entry) => entry.id === item.productId
    );

    return product ? [{ ...item, product }] : [];
  });

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#171914]">
      <StoreHeader />

      <main className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="mb-16 border-b border-black/10 pb-12">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
            Your selection
          </p>

          <h1 className="text-6xl font-medium tracking-[-0.075em] md:text-8xl">
            The bag<span className="text-neutral-400">.</span>
          </h1>

          <p className="mt-6 text-sm text-neutral-500">
            {ready ? `${count} items selected` : "Loading your bag"}
          </p>
        </div>

        {!ready ? (
          <div className="py-24 text-center text-neutral-500" role="status">
            Loading your selection...
          </div>
        ) : cartProducts.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <ShoppingBag size={48} strokeWidth={1} />

            <h2 className="mt-8 text-4xl tracking-[-0.05em]">
              Your bag is empty.
            </h2>

            <p className="mt-4 text-sm text-neutral-500">
              Good design is waiting to be discovered.
            </p>

            <Link
              to="/products"
              className="mt-10 inline-flex items-center gap-4 bg-[#171914] px-8 py-5 text-xs font-bold uppercase tracking-widest text-white"
            >
              Explore collection <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_380px]">
            <section>
              <div className="space-y-8">
                {cartProducts.map(({ product, quantity }) => (
                  <article
                    key={product.id}
                    className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row"
                  >
                    <Link
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      className="block w-full shrink-0 bg-[#e9e7e1] sm:w-44"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col justify-between gap-8">
                      <div className="flex justify-between gap-5">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-neutral-500">
                            {product.category}
                          </p>

                          <Link
                            to="/products/$slug"
                            params={{ slug: product.slug }}
                            className="mt-3 block text-2xl font-medium tracking-tight"
                          >
                            {product.name}
                          </Link>

                          <p className="mt-3 text-sm text-neutral-500">
                            {formatCurrency(product.price)} each
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="self-start text-neutral-500 hover:text-black"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center border border-black/20">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity - 1)
                            }
                            className="p-3"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="min-w-8 text-center text-sm">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity + 1)
                            }
                            disabled={quantity >= product.stock}
                            className="p-3 disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        <span className="font-medium">
                          {formatCurrency(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="mt-8 text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-black"
              >
                Clear bag
              </button>
            </section>

            <aside>
              <div className="sticky top-8 bg-[#eae9e3] p-8">
                <h2 className="text-3xl font-medium tracking-tight">
                  Order summary
                </h2>

                <div className="mt-10 flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="mt-5 flex justify-between text-sm text-neutral-500">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="mt-10 flex justify-between border-t border-black/20 pt-6">
                  <span className="font-semibold">Subtotal</span>
                  <span className="text-2xl font-medium">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <button
                  type="button"
                  disabled
                  className="mt-8 flex w-full cursor-not-allowed items-center justify-between bg-[#171914] px-6 py-5 text-xs font-bold uppercase tracking-widest text-white opacity-60"
                  title="Checkout is coming in Sprint 3"
                >
                  Checkout coming soon
                  <ArrowRight size={18} />
                </button>

                <p className="mt-5 text-xs leading-6 text-neutral-500">
                  Checkout and order processing will become available
                  when we connect the backend.
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
