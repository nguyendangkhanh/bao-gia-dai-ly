"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem } from "@/types/cart";
import {
  getCartItems,
  addToCart as addToCartLib,
  removeFromCart as removeFromCartLib,
  updateCartQuantity as updateQtyLib,
  clearCart as clearCartLib,
  getCartTotal,
} from "@/lib/cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  retailTotal: number;
  dealerTotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clear: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(getCartItems());
    setMounted(true);
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems(addToCartLib(item));
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((variantId: number) => {
    setItems(removeFromCartLib(variantId));
  }, []);

  const updateQuantity = useCallback((variantId: number, quantity: number) => {
    setItems(updateQtyLib(variantId, quantity));
  }, []);

  const clear = useCallback(() => {
    setItems(clearCartLib());
  }, []);

  const totals = getCartTotal(items);

  if (!mounted) {
    return (
      <CartContext.Provider
        value={{
          items: [],
          itemCount: 0,
          retailTotal: 0,
          dealerTotal: 0,
          addItem: () => {},
          removeItem: () => {},
          updateQuantity: () => {},
          clear: () => {},
          isOpen: false,
          setIsOpen: () => {},
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount: totals.itemCount,
        retailTotal: totals.retailTotal,
        dealerTotal: totals.dealerTotal,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
