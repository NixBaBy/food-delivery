"use client";
import React, { useEffect, useState } from "react";
import Foods from "./Foods";
type Category = {
  id: number;
  categoryName: string;
};
const Categorys = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8080/api/categories`);
      const data = await res.json();
      setCategories(data);
      console.log(data);
    };
    getData();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-9 px-[48px] py-8">
        <h2 className="text-white font-bold tracking-[-2.5%] text-[30px]">
          Categories
        </h2>
        <div className="flex gap-[8px]">
          {categories.map((category) => {
            return (
              <button
                key={category.id}
                className=" py-1 px-5 bg-white rounded-full"
              >
                {category.categoryName}
              </button>
            );
          })}
        </div>
      </div>
      <Foods />
    </div>
  );
};

export default Categorys;
