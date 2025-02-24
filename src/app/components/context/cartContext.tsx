"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  selectedSize: string;
  selectedColor: string;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  grandTotal: number;
  deliveryCharge: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);


  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  console.log(cart.length);
  // Save cart to localStorage whenever it changes
  
  useEffect(() => {
    if(cart.length > 0){
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("🔹 Cart updated:", cart); // Debugging log
    }
  }, [cart]);
  
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Count total items

  const addToCart = (newItem: CartItem) => {
    console.log("🛒 Adding item to cart:", newItem); // Debugging log

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === newItem.productId &&
      item.selectedSize === newItem.selectedSize &&
      item.selectedColor === newItem.selectedColor);

      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === newItem.productId  &&
        item.selectedSize === newItem.selectedSize &&
        item.selectedColor === newItem.selectedColor
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prevCart, newItem];
    });
  };
  

  const updateQuantity = (productId: string,selectedSize: string, selectedColor: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId  &&
    item.selectedSize === selectedSize &&
    item.selectedColor === selectedColor? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const deliveryCharge = 250; // 🛵 Fixed delivery charge

const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0); // 🛒 Subtotal
const grandTotal = subtotal +  deliveryCharge; // 🎯 Grand Total (only if cart is not empty)


  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, subtotal, grandTotal, deliveryCharge, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  console.log("in usecart", context);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
