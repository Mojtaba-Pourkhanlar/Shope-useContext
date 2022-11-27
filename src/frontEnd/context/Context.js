import React, { createContext, useEffect, useState } from "react";
import { DATAPRODUCT } from "../data";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(DATAPRODUCT);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart) setCart(dataCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("dataCart", JSON.stringify(cart));
  }, [cart]);

  const addCart = (id) => {
    const check = cart.every((item) => {
      return item._id !== id;
    });
    if (check) {
      const data = products.filter((product) => {
        return product._id === id;
      });
      setCart([...cart, ...data]);
    } else {
      alert("The shopping cart is empty 😒");
    }
  };

  const increase = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.count += 1;
      }
    });

    setCart([...cart]);
  };

  const decrease = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    setCart([...cart]);
  };

  const removeProduct = (id) => {
    if (window.confirm("آیا از حذف محصول مطمئنید؟")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
    }
  };

  const value = {
    products: [products, setProducts],
    cart: [cart, setCart],
    addCart: addCart,
    increase: increase,
    decrease: decrease,
    removeProduct: removeProduct,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
