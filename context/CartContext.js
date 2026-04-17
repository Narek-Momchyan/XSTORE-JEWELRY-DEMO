"use client"
import { createContext, useState, useEffect } from "react"



export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('orders');
    if (data) {
      try {
        setOrders(JSON.parse(data));
      } catch (e) {
        console.error("Error parsing cart data", e);
      }
    }
  }, []);
  useEffect(() => {
    const calculateItemPrice = (basePrice, qty) => {
      if (qty >= 6) return basePrice * 0.9;
      if (qty >= 3) return basePrice * 0.95;
      return basePrice;
    };

    let totalAmountRes = orders.reduce((acc, elem) => {
      const baseP = elem.basePrice || (typeof elem.price === 'string'
        ? parseFloat(elem.price.replace(/[^0-9.-]+/g, ""))
        : elem.price);
      const actualPrice = calculateItemPrice(baseP, elem.quantity);
      return acc + (actualPrice * elem.quantity);
    }, 0);

    setTotalAmount(totalAmountRes);

    const totalCountRes = orders.reduce((acc, elem) => acc + elem.quantity, 0);
    setTotalCount(totalCountRes);

    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders]);

  const add = (product) => {
    const qtyToAdd = typeof product.quantity === 'number' ? product.quantity : 1;
    const existingOrder = orders.find(elem => elem.id === product.id);

    const basePrice = typeof product.price === 'string'
      ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
      : product.price;

    if (existingOrder) {
      const newOrders = orders.map(elem => {
        if (elem.id === product.id) {
          return { ...elem, quantity: elem.quantity + qtyToAdd, basePrice };
        }
        return elem;
      });
      setOrders(newOrders);
    } else {
      const newOrder = { ...product, basePrice, quantity: qtyToAdd };
      setOrders([...orders, newOrder]);
    }
  };

  const plus = (id) => {
    const newOrders = orders.map(elem => {
      if (elem.id === id) {
        return { ...elem, quantity: elem.quantity + 1 }
      }
      return elem;
    })
    setOrders(newOrders)
  };

  const minus = (id) => {
    const existingOrder = orders.find(elem => elem.id === id);
    if (existingOrder.quantity - 1 === 0) {
      return remove(id);
    }
    const newOrders = orders.map(elem => {
      if (elem.id === id) {
        return { ...elem, quantity: elem.quantity - 1 };
      }
      return elem;
    });
    setOrders(newOrders);
  };

  const remove = (id) => {
    const newOrders = orders.filter(elem => elem.id !== id);
    setOrders(newOrders);
  };

  const removeAll = () => {
    setOrders([]);
  };

  return (
    <CartContext.Provider value={{
      orders,
      add,
      plus,
      minus,
      remove,
      removeAll,
      totalAmount,
      totalCount,
      show,
      setShow
    }}>
      {children}
    </CartContext.Provider>
  )
}