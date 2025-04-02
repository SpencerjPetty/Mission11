import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.bookID === item.bookID);
      const updatedCart = prevCart.map((i) =>
        i.bookID === item.bookID
          ? { ...i, quantity: i.quantity + item.quantity } // ✅ Keep price unchanged
          : i
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.bookID !== bookId));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  // Get the total price (subtotal) of all items in the cart
  const getCartSubtotal = (): number => {
    return cart.reduce(
      (subtotal, item) => subtotal + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getCartSubtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
