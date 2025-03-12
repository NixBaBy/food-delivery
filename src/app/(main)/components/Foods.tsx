type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
  _id: string;
};
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
const Foods = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8080/foods`);
      const data = await res.json();
      setFoods(data.newFood);
    };
    getData();
  }, []);

  return (
    <div className="flex gap-5 flex-wrap w-[1264px] m-auto">
      {foods?.map((food: Food) => {
        console.log(food.image);
        return (
          <div
            key={food._id}
            className="w-[397px] h-[342px] rounded-[20px] bg-[#FFFFFF] p-4 "
          >
            <div
              style={{ backgroundImage: `url(${food.image})` }}
              className="bg-cover bg-center w-[365px] h-[210px] rounded-xl relative"
            >
              <Dialog>
                <DialogTrigger>
                  <div className="w-[44px] h-[44px] py-2 px-4 justify-center items-center text-red-500 rounded-full bg-[#FFF] absolute bottom-5 right-5">
                    +
                  </div>
                </DialogTrigger>
                <DialogContent className="">
                  <DialogHeader>
                    <DialogTitle className="text-red-500 text-xl font-bold"></DialogTitle>
                    <div className="text-sm text-muted-foreground flex gap-6">
                      <img
                        src={food.image}
                        className="w-[377px] h-[364px] rounded-xl"
                      />
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-3">
                          <div className="text-red-500 text-lg font-bold">
                            {food.foodName}
                          </div>
                          <p className="text-sm">{food.ingredients}</p>
                        </div>
                        <div className="flex flex-col gap-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[16px] text-[#09090B]">
                                Total Price
                              </p>
                              <p className="text-[24px] font-bold tracking-[-0.6px] text-[#09090B]">
                                ${food.price}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-[44px] h-[44px] rounded-full py-2 px-4 flex items-center justify-center border-[1px] border-solid border-[#E4E4E7]">
                                -
                              </div>
                              <p className="text-[#09090B] text-[18px] font-bold">
                                1
                              </p>
                              <div className="w-[44px] h-[44px] rounded-full py-2 px-4 flex items-center justify-center border-[1px] border-solid border-[#E4E4E7]">
                                +
                              </div>
                            </div>
                          </div>
                          <Button className="w-full">Add to cart</Button>
                        </div>
                      </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
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
