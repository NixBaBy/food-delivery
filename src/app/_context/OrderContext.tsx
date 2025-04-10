"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { FoodType } from "../util/types";

type Basket = {
  food: FoodType;
  count: number;
};
type FoodOrderContextType = {
  setBasket: React.Dispatch<React.SetStateAction<Basket[]>>;
  basket: Basket[];
  handleBasket: (item: Basket) => void;
  createOrder: () => void;
};

const FoodOrderContext = createContext<FoodOrderContextType>(
  {} as FoodOrderContextType
);

export const useFoodOrder = () => {
  return useContext(FoodOrderContext);
};

const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<Basket[]>([]);

  const createOrder = async () => {
    try {
      const response = await fetch(
        "https://food-deliveryservice.onrender.com/food-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ basket }),
        }
      );
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
  };

  const handleBasket = (item: Basket) => {
    setBasket((prev) => [...prev, item]);
  };

  console.log(basket);

  return (
    <FoodOrderContext.Provider
      value={{ basket, setBasket, handleBasket, createOrder }}
    >
      {children}
    </FoodOrderContext.Provider>
  );
};

export default OrderProvider;
