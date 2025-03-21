"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CategoryType } from "../util/types";

type CategoryContextType = {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  createCategory: (_name: string) => void;
  deleteCategory: (_category: string) => void;
  editCategory: (_id: string, categoryName: string) => void;
};

const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export const useCategory = () => {
  return useContext(CategoryContext);
};

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getData = async () => {
    const res = await fetch(`http://localhost:8080/food-category`);
    const data = await res.json();
    setCategories(data.getCagegory);
  };

  const createCategory = async (name: string) => {
    try {
      const response = await fetch("http://localhost:8080/food-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName: name }),
      });
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
    getData();
  };

  const deleteCategory = async (category: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/food-category/${category}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
    alert("amjilttai ustglaa");
    getData();
  };

  const editCategory = async (id: string, categoryName: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/food-category/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName }),
        }
      );
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
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        createCategory,
        deleteCategory,
        editCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
