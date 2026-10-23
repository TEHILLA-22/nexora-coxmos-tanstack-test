
import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  products,
  type Category,
} from "../../data/products";
import { StoreHeader } from "../../components/storefront/StoreHeader";
import { ProductCard } from "../../components/storefront/ProductCard";

export const Route = createFileRoute("/products/")({
  component: ProductsPage,
});

type FilterCategory = "All" | Category;
type SortMode = "featured" | "price-low" | "price-high" | "name";

const categories: FilterCategory[] = [
  "All",
  "Furniture",
  "Lighting",
  "Objects",
];

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FilterCategory>("All");
  const [sort, setSort] = useState<SortMode>("featured");

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized);

      return matchesCategory && matchesSearch;
    });

    return result.sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
  }, [search, category, sort]);

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#171914]">
      <StoreHeader />

      <section className="border-b border-black/10 px-6 pb-16 pt-20 md:px-12 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Nexora / The collection
          </p>

          <h1 className="max-w-5xl text-[clamp(4.5rem,10vw,10rem)] font-medium leading-[0.9] tracking-[-0.08em]">
            Considered
            <br />
            <span className="text-neutral-400">objects.</span>
          </h1>

          <p className="mt-10 max-w-lg text-sm leading-8 text-neutral-600">
            An evolving collection of furniture, lighting,
            and everyday objects. Carefully selected for the
            spaces you call home.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex flex-col gap-8 border-b border-black/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    category === item
                      ? "bg-[#171914] text-white"
                      : "border border-black/15 hover:border-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center gap-3 border-b border-black/30 py-2">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search collection..."
                  aria-label="Search products"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500 sm:w-52"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <SlidersHorizontal size={17} />
                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value as SortMode)
                  }
                  aria-label="Sort products"
                  className="bg-transparent py-2 text-xs font-semibold uppercase tracking-wider outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to high</option>
                  <option value="price-high">Price: High to low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-neutral-500">
              {filteredProducts.length} products
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-500">
              Curated essentials
            </span>
          </div>

          {filteredProducts.length ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <Search size={35} strokeWidth={1} />
              <h2 className="mt-6 text-3xl tracking-tight">
                Nothing found.
              </h2>
              <p className="mt-3 text-sm text-neutral-500">
                Try another search or category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-8 border-b border-black pb-2 text-xs font-bold uppercase tracking-widest"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
