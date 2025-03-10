"use client";
import React, { useEffect, useState } from "react";
type Category = {
  _id: number;
  categoryName: string;
};
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import CloudinaryUpload from "../components/CloudinaryUpload";

const page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8080/food-category`);
      const data = await res.json();
      setCategories(data.getCagegory);
      console.log(data);
    };
    getData();
  }, []);
  return (
    <div className="bg-[#f4f4f5] w-screen h-screen p-6">
      <div className="p-6  w-full m-auto  flex flex-col gap-[24px] ">
        <div className="flex flex-col bg-[#fff] p-5 rounded-xl  gap-4 ">
          <p className="text-[20px] font-bold tracking-[-0.5px]">
            Dishes category
          </p>
          <div className="flex gap-3 items-center flex-wrap ">
            {categories?.map((category: Category) => {
              return (
                <button
                  key={category._id}
                  className=" py-1 px-5 bg-white rounded-full"
                >
                  {category.categoryName}
                </button>
              );
            })}
            <div className="w-[36px] h-[36px] py-2 px-4 flex justify-center items-center bg-[#EF4444] rounded-full text-white">
              +
            </div>
          </div>
        </div>
        <div className="flex p-5 gap-4 bg-xl bg-[#fff] flex-col rounded-xl mt-5">
          <p>Appetizers</p>
          <Dialog>
            <DialogTrigger asChild>
              <div className="py-2 px-4 flex flex-col justify-center items-center gap-6 border-dashed border-[1px] border-red-500 rounded-[20px] h-[241px] w-[249px] cursor-pointer">
                <div className="w-[36px] h-[36px] py-2 px-4 flex justify-center items-center bg-[#EF4444] rounded-full text-white">
                  +
                </div>
                <p className="text-[14px] font-bold w-[154px] text-center">
                  Add new Dish to Appeziters
                </p>
              </div>
            </DialogTrigger>
            <DialogContent className="w-[460px] p-6 rounded-xl bg-[#FFF]">
              <DialogTitle>
                <p className="text-[18px] font-bold">
                  Add new Dish to Appetizers
                </p>
              </DialogTitle>
              <div className="flex flex-col gap-[24px] ">
                <div className="flex gap-[24px]">
                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-bold">Food Name</p>
                    <Input placeholder="Type food name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-bold">Food Price</p>
                    <Input placeholder="Enter Price" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[14px] font-bold">Ingredients</p>
                  <Input placeholder="List Ingredients" />
                </div>
                <div>
                  <p className="text-[14px] font-bold">Food Image</p>
                  <CloudinaryUpload />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default page;
