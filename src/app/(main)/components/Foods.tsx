type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: number;
  id: number;
};
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
const Foods = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8080/api/foods`);
      const data = await res.json();
      setFoods(data);
    };
    getData();
  }, []);

  return (
    <div className="flex gap-5 flex-wrap w-[1264px] m-auto">
      {foods?.map((food: Food) => {
        return (
          <div
            key={food.id}
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
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription
                      ref={null}
                      className="text-sm text-muted-foreground w-826px h-[412px] p-6 flex gap-6 rounded-[20px]"
                    >
                      <div className="flex gap-6">
                        <img
                          src={food.image}
                          className="w-full h-full rounded-xl"
                        />
                        <div className="flex flex-col gap-3">
                          <p className="text-red-500 text-[24px] font-bold tracking-[-0.6px]">
                            {food.foodName}
                          </p>
                          <p className="text-[14px]">{food.ingredients}</p>
                        </div>
                      </div>
                    </DialogDescription>
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
