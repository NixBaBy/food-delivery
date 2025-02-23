"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: number;
  id: number;
};
const Foods = () => {
  const [foodData, setFoodData] = useState<Food[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8080/api/foods`);
      const data = await res.json();
      setFoodData(data);
      console.log(data);
    };
    getData();
  }, []);
  return (
    <div className="flex gap-5 flex-wrap w-[1264px] m-auto">
      {foodData.map((food) => {
        return (
          <div
            key={food.id}
            className="w-[397px] h-[342px] rounded-[20px] bg-[#FFFFFF] p-4 "
          >
            <div
              style={{ backgroundImage: `url(${food.image})` }}
              className="bg-cover bg-center w-[365px] h-[210px] rounded-xl "
            ></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-red-500 text-[24px] font-bold tracking-[-0.6px] ">
                  {food.foodName}
                </p>
                <p className="text-[#09090B] text-[18px] font-bold ">
                  ${food.price}
                </p>
              </div>
              <p className="text-[14px]">{food.ingredients}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Foods;
