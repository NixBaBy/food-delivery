"use client";
import React, { useEffect, useState } from "react";
import Foods from "./Foods";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCategory } from "@/app/_context/CategoryContext";

const Categorys = () => {
  const { categories } = useCategory();

  return (
    <div className="max-w-[1440px] m-auto">
      <div className="flex flex-col gap-9 px-[48px] py-8">
        <h2 className="text-white font-bold tracking-[-2.5%] text-[30px]">
          Categories
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[99.9%] m-auto"
        >
          <CarouselContent className="flex gap-2">
            {categories?.map((category) => (
              <CarouselItem key={category._id} className="basis-22">
                <button className="py-1 px-5 bg-white rounded-full">
                  {category.categoryName}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 -left-10 z-10" />
          <CarouselNext className="absolute top-1/2 -right-10 z-10" />
        </Carousel>
      </div>
      <Foods />
    </div>
  );
};

export default Categorys;
