import React from "react";
type Category = {
  id: number;
  categoryName: string;
};
const page = async () => {
  const res = await fetch(`http://localhost:8080/api/categories`);
  const data = await res.json();
  return (
    <div className="bg-[#f4f4f5] w-screen h-screen">
      <div className="p-6 bg-[#fff] w-[1123px] m-auto rounded-xl">
        <div className="flex flex-col  gap-4 ">
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
            <div className="w-[36px] h-[36px] py-2 px-4 justify-center items-center bg-[#EF4444] rounded-full text-white">
              +
            </div>
          </div>
        </div>
        <div className="flex p-5 gap-4 bg-xl bg-[#fff] flex-col mt-5">
          <p>Appetizers</p>
          <div>
            <div className="py-2 px-4 flex flex-col justify-center items-center gap-6 border-dashed border-[1px] border-red-500 rounded-[20px] h-[241px] w-[249px]">
              <div className="w-[36px] h-[36px] py-2 px-4 justify-center items-center bg-[#EF4444] rounded-full text-white">
                +
              </div>
              <p className="text-[14px] font-bold w-[154px] text-center">
                Add new Dish to Appeziters
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
