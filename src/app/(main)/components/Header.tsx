import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Header = () => {
  return (
    <div>
      <div className="w-full bg-[#18181B] h-[68px] flex  items-center justify-between py-3 px-[88px]">
        <div className="flex gap-3">
          <img src="/logo.svg" alt="" className="w-[46px] h-[37.29px]" />
          <div>
            <div className="flex items-center text-[20px] font-bold ">
              <p className="text-[#FAFAFA]  tracking-[-0.5px] ">Nom</p>
              <p className="text-[#EF4444] tracking-[-0.5px]">Nom</p>
            </div>
            <p className="text-[12px] text-[#f4f4f5]">Swift delivery</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 items-center bg-[#FFFFFF] py-2 px-3 rounded-full">
            <MapPin color="#EF4444" />
            <p className="text-[#EF4444] text-[12px]">Delivery address:</p>
            <p className="text-[#71717A] text-[12px]">Add Location</p>
            <ChevronRight color="gray" />
          </div>
          <Sheet>
            <SheetTrigger>
              <div className="w-[36px] h-[36px] bg-[#f4f4f5] rounded-[50%] flex justify-center items-center">
                <ShoppingCart color="black" className="w-[13px] h-[13px]" />
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex gap-3">
                  <ShoppingCart />
                  Order detail
                </SheetTitle>
                <SheetDescription>
                  <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                      <TabsTrigger value="cart">Cart</TabsTrigger>
                      <TabsTrigger value="order">Order</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cart">
                      <div>
                        <p>My Cart</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="order">
                      Change your password here.
                    </TabsContent>
                  </Tabs>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Popover>
            <PopoverTrigger>
              <div className="w-[36px] h-[36px] bg-[#EF4444] rounded-[50%] flex justify-center items-center">
                <User color="white" className="w-[13px] h-[13px]" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex gap-2 p-4 rounded-xl flex-col justify-center items-center">
                <p className="font-bold text-[20px] tracking-[-0.5px]">
                  Test@gmail.com
                </p>
                <Button variant="secondary">sign out</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
