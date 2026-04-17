'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        setWishlist([]);
      }
    }
  }, []);

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    setWishlist((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      const updated = isExist 
        ? prev.filter((item) => item.id !== product.id) 
        : [...prev, product];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);