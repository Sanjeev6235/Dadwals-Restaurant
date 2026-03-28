import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (food) => {
    setItems(prev => {
      const exists = prev.find(i => i._id === food._id);
      if (exists) {
        toast.success(`${food.name} quantity updated!`);
        return prev.map(i => i._id === food._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      toast.success(`${food.name} added to cart!`);
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i._id !== id));
    toast.success('Item removed');
  };

  const updateQty = (id, qty) => {
    if (qty < 1) { removeItem(id); return; }
    setItems(prev => prev.map(i => i._id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => { setItems([]); localStorage.removeItem('cart'); };

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
