import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-6 w-[416px]">
      <Link href="sign-up">
        <ChevronLeft color="#18181B" />
      </Link>
      <div>
        <p className="text-[#09090B] text-[24px] font-bold tracking-[-0.6px]">
          Log in
        </p>
        <p className="text-[#71717A] text-[16px] ">
          Log in to enjoy your favorite dishes.
        </p>
      </div>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email address"
        className="rounded-md border-[1px] border-solid border-[#E4E4E7] bg-[#FFF] py-[8px] px-[12px]"
      />
      <Input
        placeholder="Password"
        type="password"
        className="py-[8px] px-[12px]"
      />
      <p>Forgat Password?</p>
      <Link href="/">
        <Button disabled className="w-full px-[32px]">
          Lets Go
        </Button>
      </Link>
      <div className="flex gap-3">
        <p className="text-[#71717A] text-4">Don’t have an account?</p>
        <a href="#" className="text-[#2563EB] text-4">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Page;
