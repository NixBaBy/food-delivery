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
    };
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-9 px-[48px] py-8">
        <h2 className="text-white font-bold tracking-[-2.5%] text-[30px]">
          Categories
        </h2>
        <Carousel>
          <CarouselContent className="flex gap-2">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="flex-shrink-0 w-[200px]"
              >
                {" "}
                {/* Тохируулсан хэмжээ */}
                <button className="py-1 px-5 bg-white rounded-full">
                  {category.categoryName}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-0 z-10" />
          <CarouselNext className="absolute top-1/2 right-0 z-10" />
        </Carousel>
      </div>
      <Foods />
    </div>
  );
};

export default Categorys;
