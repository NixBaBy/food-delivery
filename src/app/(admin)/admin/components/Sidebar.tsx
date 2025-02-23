import React from "react";

const Sidebar = () => {
  return (
    <div className="w-[205px] py-5 px-[20px] flex flex-col h-[100vh] gap-10 bg-[#E4E4E7]">
      <div className="flex  gap-3">
        <img src="/logo.svg" alt="" className="w-[46px] h-[37.29px]" />
        <div>
          <div className="flex items-center ">
            <p className="text-[#09090B] text-[18px] font-bold tracking-[-0.5px] ">
              NomNom
            </p>
          </div>
          <p className="text-[12px] text-[#71717A]">Swift delivery</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 ">
        <div className="flex gap-[10px]">
          <img src="/adminFOodMenu.svg" alt="" className="w-[22px] h-[22px]" />
          <p className="text-[#09090B] text-[14px] font-bold">Food menu</p>
        </div>
        <div className="py-2 px-[8px] flex items-center rounded-full bg-[#18181B] text-white flex justify-center items-center gap-[10px]">
          <img src="/orders.svg" alt="" className="w-[22px] h-[22px]" />
          <p>Orders</p>
        </div>
        <div className="flex gap-[10px]">
          <img src="/settings.svg" alt="" className="w-[22px] h-[22px]" />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
