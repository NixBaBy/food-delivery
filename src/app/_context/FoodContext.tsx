"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FoodType } from "../util/types";

type CategoryContextType = {
  foods: FoodType[];
  setFoods: React.Dispatch<React.SetStateAction<FoodType[]>>;
  deleteFood: (foodId: string) => void;
  editFood: (
    ingredients: string,
    foodName: string,
    price: string,
    category: string,
    foodId: string
  ) => void;
  getData: () => void;
};

const FoodContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export const useFood = () => {
  return useContext(FoodContext);
};

const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foods, setFoods] = useState<FoodType[]>([]);

  const getData = async () => {
    const res = await fetch(`http://localhost:8080/foods`);
    const data = await res.json();
    setFoods(data.newFood);
  };

  const deleteFood = async (foodId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/foods/${foodId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
    alert("amjilttai ustglaa");
    getData();
  };

  const editFood = async (
    ingredients: string,
    foodName: string,
    price: string,
    category: string,
    foodId: string
  ) => {
    try {
      const response = await fetch(`http://localhost:8080/foods/${foodId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients, foodName, price, category }),
      });
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <FoodContext.Provider
      value={{ foods, setFoods, deleteFood, editFood, getData }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;
