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
};

const FoodOrderContext = createContext<FoodOrderContextType>(
  {} as FoodOrderContextType
);

export const useFoodOrder = () => {
  return useContext(FoodOrderContext);
};

const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<Basket[]>([]);

  const handleBasket = (item: Basket) => {
    setBasket((prev) => [...prev, item]);
  };

  console.log(basket);

  return (
    <FoodOrderContext.Provider value={{ basket, setBasket, handleBasket }}>
      {children}
    </FoodOrderContext.Provider>
  );
};

export default OrderProvider;
