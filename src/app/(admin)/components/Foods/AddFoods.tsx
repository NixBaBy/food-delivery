"use client";

import React, { useEffect, useState } from "react";
import FoodsDialog from "./FoodsDialog";

type Category = {
  _id: string;
  categoryName: string;
};
type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category?: string;
  _id?: string | any;
};

const Foods = ({ categories }: { categories: Category[] }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const getData = async () => {
    const res = await fetch(`http://localhost:8080/foods`);
    const data = await res.json();
    setFoods(data.newFood);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex  gap-4  flex-col  mt-5">
      <div>
        {categories?.map((category) => {
          return (
            <div
              key={category._id}
              className="p-5 bg-xl bg-[#fff] rounded-xl mt-5 flex flex-col gap-4 "
            >
              <p className="text-black text-[20px] tracking-[-0.5] font-bold">
                {category.categoryName}
              </p>
              <div className="flex flex-wrap gap-4">
                <FoodsDialog getData={getData} id={category._id} />
                {foods
                  .filter((food) => food.category === category._id)
                  .map((filteredFood) => (
                    <div
                      key={filteredFood._id}
                      className="flex flex-col gap-5 p-4 rounded-[20px] border-solid border-[1px] border-[#E4E4E7] bg-[#FFF] w-[270px] "
                    >
                      <img
                        src={filteredFood.image}
                        alt=""
                        className=" rounded-xl w-[100%] h-[129px] object-cover"
                      />
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <p className="text-bold text-[14px] text-[#EF4444]">
                            {filteredFood.foodName}
                          </p>
                          <p className="text-[12px] text-[#09090B]">
                            {filteredFood.price}
                          </p>
                        </div>
                        <p className="text-[12px] text-[#09090B]">
                          {filteredFood.ingredients}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Foods;
