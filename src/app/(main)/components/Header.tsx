"use client";
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
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const signOutHandler = () => {
    localStorage.clear();
    router.push("/login");
  };

  const userEmail = localStorage.getItem("email");
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
          {userEmail ? (
            <div className="flex gap-2 items-center bg-[#FFFFFF] py-2 px-3 rounded-full">
              <MapPin color="#EF4444" />
              <p className="text-[#EF4444] text-[12px]">Delivery address:</p>
              <p className="text-[#71717A] text-[12px]">Add Location</p>
              <ChevronRight color="gray" />
            </div>
          ) : (
            ""
          )}
          {userEmail ? (
            <Sheet>
              <SheetTrigger>
                <div className="w-[36px] h-[36px] bg-[#f4f4f5] rounded-[50%] flex justify-center items-center">
                  <ShoppingCart color="black" className="w-[13px] h-[13px]" />
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="flex gap-3 text-background">
                    <ShoppingCart />
                    Order detail
                  </SheetTitle>
                  <Tabs defaultValue="account">
                    <TabsList className="w-[100%] rounded-full">
                      <TabsTrigger
                        value="cart"
                        className="w-[50%] rounded-full"
                      >
                        Cart
                      </TabsTrigger>
                      <TabsTrigger
                        value="order"
                        className="w-[50%] rounded-full"
                      >
                        Order
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="cart" className="text-background">
                      <div className="w-[439px] h-[508px] p-4 rounded-[20px] "></div>
                    </TabsContent>
                    <TabsContent value="order" className="text-background">
                      Change your password here.
                    </TabsContent>
                  </Tabs>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ) : (
            ""
          )}

          {userEmail ? (
            <Popover>
              <PopoverTrigger>
                <div className="w-[36px] h-[36px] bg-[#EF4444] rounded-[50%] flex justify-center items-center">
                  <User color="white" className="w-[13px] h-[13px]" />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-2 p-4 rounded-xl flex-col justify-center items-center">
                  <p className="font-bold text-[20px] tracking-[-0.5px]">
                    {userEmail}
                  </p>
                  <Button variant="secondary" onClick={signOutHandler}>
                    sign out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-[13px] items-center">
              <Button
                onClick={() => router.push("/sign-up")}
                className="h-[36px] py-2 px-[12px] rounded-full bg-white text-black"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => router.push("/login")}
                className="h-[36px] py-2 px-[12px] rounded-full bg-red-500 text-white"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
