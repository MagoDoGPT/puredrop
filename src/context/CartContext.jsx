import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'puredrop_cart_v1';

const readStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.handle === item.handle && i.purchaseType === item.purchaseType);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
  };

  const removeItem = (handle, purchaseType) => {
    setItems((prev) => prev.filter((i) => !(i.handle === handle && i.purchaseType === purchaseType)));
  };

  const updateQty = (handle, purchaseType, qty) => {
    if (qty < 1) return removeItem(handle, purchaseType);
    setItems((prev) => prev.map((i) => (i.handle === handle && i.purchaseType === purchaseType ? { ...i, qty } : i)));
  };

  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const i of items) {
      c += i.qty;
      s += i.unitPrice * i.qty;
    }
    return { count: c, subtotal: s };
  }, [items]);

  const value = { items, addItem, removeItem, updateQty, clear, count, subtotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
