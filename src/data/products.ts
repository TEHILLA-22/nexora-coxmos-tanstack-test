
export type Category =
  | "Furniture"
  | "Lighting"
  | "Objects";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  featured: boolean;
  stock: number;
  tag?: string;
}

export const products: Product[] = [
  {
    id: "prd_001",
    slug: "form-lounge-chair",
    name: "Form Lounge Chair",
    category: "Furniture",
    price: 285000,
    description:
      "An understated lounge chair created for slow afternoons and thoughtfully arranged spaces.",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000&auto=format&fit=crop",
    featured: true,
    stock: 12,
    tag: "Bestseller",
  },
  {
    id: "prd_002",
    slug: "arc-table-lamp",
    name: "Arc Table Lamp",
    category: "Lighting",
    price: 87500,
    description:
      "A sculptural lighting piece that brings warmth and character to everyday interiors.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&auto=format&fit=crop",
    featured: true,
    stock: 18,
    tag: "New arrival",
  },
  {
    id: "prd_003",
    slug: "everyday-accent-chair",
    name: "Everyday Accent Chair",
    category: "Furniture",
    price: 192000,
    description:
      "A comfortable contemporary accent chair with clean lines and a versatile silhouette.",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=1000&auto=format&fit=crop",
    featured: true,
    stock: 8,
  },
  {
    id: "prd_004",
    slug: "ceramic-vessel",
    name: "Ceramic Vessel",
    category: "Objects",
    price: 38500,
    description:
      "A simple decorative vessel with a natural finish and timeless appeal.",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1000&auto=format&fit=crop",
    featured: true,
    stock: 24,
    tag: "Limited",
  },
  {
    id: "prd_005",
    slug: "studio-dining-chair",
    name: "Studio Dining Chair",
    category: "Furniture",
    price: 145000,
    description:
      "A refined dining chair that balances natural materials and contemporary proportions.",
    image:
      "https://images.unsplash.com/photo-1598300053653-4f2e2d8f7a9c?w=1000&auto=format&fit=crop",
    featured: false,
    stock: 15,
  },
  {
    id: "prd_006",
    slug: "ambient-pendant-light",
    name: "Ambient Pendant Light",
    category: "Lighting",
    price: 112000,
    description:
      "An elegant pendant light designed to add a welcoming atmosphere to your space.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&auto=format&fit=crop",
    featured: false,
    stock: 11,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
