
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

import { products } from "../data/products";
import { ProductCard } from "../components/storefront/ProductCard";
import { StoreHeader } from "../components/storefront/StoreHeader";

export const Route = createFileRoute("/")({
  component: HomePage,
});



const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function Header() {
  return (
    <header className="sticky absolute inset-x-0 bg-[#171914] top-0 z-50 border-b border-white/20 text-white">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
        <Link to="/" className="text-2xl font-black tracking-[-0.08em]">
          NEXORA<span className="text-[#d8ff67]">.</span>
        </Link>

        <nav className="hidden items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.18em] md:flex">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/about">Our Story</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <Link to="/cart" aria-label="Shopping cart" className="flex items-center gap-2">
          <ShoppingBag size={20} strokeWidth={1.5} />
          <span className="text-xs">Cart</span>
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[760px] items-end overflow-hidden bg-[#171914] text-white md:min-h-screen">
      <img
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&auto=format&fit=crop"
        alt="Contemporary interior with carefully selected furniture"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-24 pt-40 md:px-12 md:pb-32">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8ff67]">
          Objects for intentional living
        </p>

        <h1 className="max-w-5xl text-[clamp(4.5rem,11vw,11rem)] font-medium leading-[0.85] tracking-[-0.085em]">
          Live
          <br />
          beautifully<span className="text-[#d8ff67]">.</span>
        </h1>

        <div className="mt-12 flex max-w-xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xs text-sm leading-7 text-white/75">
            Thoughtfully curated furniture and everyday objects
            designed to make your space feel extraordinary.
          </p>

          <Link
            to="/products"
            className="inline-flex shrink-0 items-center justify-center gap-5 bg-[#d8ff67] px-7 py-5 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white"
          >
            Explore collection
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      <span className="absolute bottom-8 right-8 hidden text-[10px] uppercase tracking-[0.3em] text-white/60 md:block">
        Collection / 2026
      </span>
    </section>
  );
}



function FeaturedProducts() {
  return (
    <section className="bg-[#f7f6f2] px-6 py-24 text-[#1b1b19] md:px-12 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              The selection / 001
            </p>
            <h2 className="text-5xl font-medium tracking-[-0.065em] md:text-7xl">
              Worth keeping.
            </h2>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-4 border-b border-black pb-2 text-xs font-bold uppercase tracking-widest"
          >
            Shop all products <ArrowRight size={17} />
          </Link>
        </div>

       <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
  {products
    .filter((product) => product.featured)
    .map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
</div>
      </div>
    </section>
  );
}

function Editorial() {
  return (
    <section className="grid min-h-[650px] grid-cols-1 bg-[#20251d] text-white lg:grid-cols-2">
      <div className="flex flex-col justify-between px-8 py-16 md:px-16 md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-[#d8ff67]">
          Beyond the ordinary
        </p>

        <div className="my-20">
          <h2 className="max-w-xl text-[clamp(3.5rem,6vw,7rem)] leading-[0.98] tracking-[-0.075em]">
            Less noise.
            <br />
            More meaning.
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-8 text-white/60">
            We believe the things you bring into your home should
            be beautiful, functional, and made to last. Discover
            pieces with purpose.
          </p>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-4 border-b border-[#d8ff67] pb-3 text-xs font-semibold uppercase tracking-widest"
          >
            Discover our story <ArrowUpRight size={18} />
          </Link>
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          NEXORA / Designed for living
        </p>
      </div>

      <div className="min-h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop"
          alt="Warm minimalist interior"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    { icon: Truck, title: "Reliable delivery", description: "Carefully packed and delivered." },
    { icon: ShieldCheck, title: "Secure shopping", description: "A safer way to shop online." },
    { icon: RefreshCw, title: "Easy returns", description: "Simple, transparent return support." },
  ];

  return (
    <section className="bg-[#f7f6f2] px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-[1600px] gap-12 border-y border-black/15 py-14 md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-5">
            <Icon size={25} strokeWidth={1.3} />
            <div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-neutral-500">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#171914] px-6 pb-8 pt-20 text-white md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <h2 className="text-5xl font-black tracking-[-0.09em] md:text-7xl">
              NEXORA<span className="text-[#d8ff67]">.</span>
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/50">
              Thoughtful objects. Better spaces. Everyday living, reimagined.
            </p>
          </div>
          <nav className="flex flex-wrap gap-8 text-xs uppercase tracking-widest text-white/70">
            <Link to="/products">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
        <div className="mt-24 flex flex-wrap justify-between gap-4 border-t border-white/20 pt-8 text-[10px] uppercase tracking-widest text-white/40">
          <span>© {new Date().getFullYear()} NEXORA</span>
          <span>Commerce, considered.</span>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturedProducts />
      <Editorial />
      <Benefits />
      <Footer />
    </main>
  );
}
