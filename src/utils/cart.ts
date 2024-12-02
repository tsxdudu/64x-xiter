import { Cart, CartItem } from '../types/cart';

const CART_KEY = 'gaming_store_cart';


const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};


export const getCart = (): Cart => {
  const cart = localStorage.getItem(CART_KEY);
  try {
    return cart ? JSON.parse(cart) : { items: [], total: 0 };
  } catch (error) {
    console.error('Erro ao obter o carrinho do localStorage:', error);
    return { items: [], total: 0 };
  }
};


const updateCart = (cart: Cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdate'));
};


export const addToCart = (item: Omit<CartItem, 'quantity'>) => {
  const cart = getCart();
  const existingItem = cart.items.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ ...item, quantity: 1 });
  }

  cart.total = calculateTotal(cart.items);
  updateCart(cart);
};


export const removeFromCart = (itemId: number) => {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item.id !== itemId);
  cart.total = calculateTotal(cart.items);
  updateCart(cart);
};


export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('cartUpdate'));
};
