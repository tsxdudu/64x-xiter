import { Cart, CartItem } from '../types/cart';

const CART_KEY = 'gaming_store_cart';

export const getCart = (): Cart => {
  const cart = localStorage.getItem(CART_KEY);
  if (!cart) return { items: [], total: 0 };
  return JSON.parse(cart);
};

export const addToCart = (item: Omit<CartItem, 'quantity'>) => {
  const cart = getCart();
  const existingItem = cart.items.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ ...item, quantity: 1 });
  }

  cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  
  // Dispatch custom event for cart updates
  window.dispatchEvent(new Event('cartUpdate'));
};

export const removeFromCart = (itemId: number) => {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item.id !== itemId);
  cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  
  // Dispatch custom event for cart updates
  window.dispatchEvent(new Event('cartUpdate'));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  // Dispatch custom event for cart updates
  window.dispatchEvent(new Event('cartUpdate'));
};