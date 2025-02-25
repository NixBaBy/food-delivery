import React from "react";
type Category = {
  id: number;
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
const page = async () => {
  const res = await fetch(`http://localhost:8080/api/categories`);
  const data = await res.json();
  return (
    <div className="bg-[#f4f4f5] w-screen h-screen p-6">
      <div className="p-6  w-full m-auto  flex flex-col gap-[24px] ">
        <div className="flex flex-col bg-[#fff] p-5 rounded-xl  gap-4 ">
          <p className="text-[20px] font-bold tracking-[-0.5px]">
            Dishes category
          </p>
          <div className="flex gap-3 items-center flex-wrap ">
            {data.map((category: Category) => {
              return (
                <button
                  key={category.id}
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
        <Dialog>
          <DialogTrigger>
            <div className="flex p-5 gap-4 bg-xl bg-[#fff] flex-col rounded-xl mt-5">
              <p>Appetizers</p>
              <div>
                <div className="py-2 px-4 flex flex-col justify-center items-center gap-6 border-dashed border-[1px] border-red-500 rounded-[20px] h-[241px] w-[249px]">
                  <div className="w-[36px] h-[36px] py-2 px-4 flex justify-center items-center bg-[#EF4444] rounded-full text-white">
                    +
                  </div>
                  <p className="text-[14px] font-bold w-[154px] text-center">
                    Add new Dish to Appeziters
                  </p>
                </div>
              </div>
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
  );
};

export default page;
