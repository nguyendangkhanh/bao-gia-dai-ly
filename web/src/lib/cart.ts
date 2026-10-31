import { CartItem } from "@/types/cart";

const CART_KEY = "dealer_cart";

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: CartItem): CartItem[] {
  const items = getCartItems();
  const existing = items.find((i) => i.variantId === item.variantId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    items.push({ ...item });
  }
  saveCartItems(items);
  return items;
}

export function removeFromCart(variantId: number): CartItem[] {
  const items = getCartItems().filter((i) => i.variantId !== variantId);
  saveCartItems(items);
  return items;
}

export function updateCartQuantity(
  variantId: number,
  quantity: number
): CartItem[] {
  const items = getCartItems();
  const item = items.find((i) => i.variantId === variantId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  saveCartItems(items);
  return items;
}

export function clearCart(): CartItem[] {
  saveCartItems([]);
  return [];
}

export function getCartTotal(items: CartItem[]): {
  retailTotal: number;
  dealerTotal: number;
  itemCount: number;
} {
  return items.reduce(
    (acc, item) => ({
      retailTotal: acc.retailTotal + item.retailPrice * item.quantity,
      dealerTotal: acc.dealerTotal + item.dealerPrice * item.quantity,
      itemCount: acc.itemCount + item.quantity,
    }),
    { retailTotal: 0, dealerTotal: 0, itemCount: 0 }
  );
}
