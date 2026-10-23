
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { products, type Product } from "../data/products";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  ready: boolean;
  count: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "nexora-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

function sanitizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  const quantities = new Map<string, number>();

  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;

    const { productId, quantity } = entry as Record<
      string,
      unknown
    >;

    if (typeof productId !== "string") continue;
    if (typeof quantity !== "number") continue;
    if (!Number.isSafeInteger(quantity) || quantity < 1) continue;

    const product = getProduct(productId);
    if (!product) continue;

    quantities.set(
      productId,
      Math.min(
        product.stock,
        (quantities.get(productId) ?? 0) + quantity,
      ),
    );
  }

  return [...quantities.entries()]
    .filter(([, quantity]) => quantity > 0)
    .map(([productId, quantity]) => ({ productId, quantity }));
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        setItems(sanitizeCart(JSON.parse(saved)));
      }
    } catch {
      // Invalid or inaccessible browser storage:
      // use an empty cart for this session.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items),
      );
    } catch {
      // The cart remains usable in memory if storage fails.
    }
  }, [items, ready]);

  const addItem = useCallback(
    (productId: string, quantity = 1) => {
      const product = getProduct(productId);

      if (!product || product.stock < 1) return;
      if (!Number.isSafeInteger(quantity) || quantity < 1) return;

      setItems((current) => {
        const existing = current.find(
          (item) => item.productId === productId,
        );

        const newQuantity = Math.min(
          product.stock,
          (existing?.quantity ?? 0) + quantity,
        );

        if (existing) {
          return current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item,
          );
        }

        return [
          ...current,
          { productId, quantity: newQuantity },
        ];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      const product = getProduct(productId);
      if (!product) return;

      if (!Number.isSafeInteger(quantity) || quantity < 0) return;

      if (quantity === 0) {
        removeItem(productId);
        return;
      }

      setItems((current) =>
        current.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: Math.min(quantity, product.stock),
              }
            : item,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProduct(item.productId);

        return sum + (product?.price ?? 0) * item.quantity;
      }, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        ready,
        count,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider",
    );
  }

  return context;
}
