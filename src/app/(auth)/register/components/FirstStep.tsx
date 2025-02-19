import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React, { Dispatch } from "react";

const FirstStep = ({
  setCurrentStep,
  currentStep,
}: {
  setCurrentStep: Dispatch<number>;
  currentStep: number;
}) => {
  const clickHandler = () => {
    setCurrentStep(currentStep + 1);
  };
  return (
    <div className="flex flex-col gap-6 w-[480px]">
      <button className="w-[36px] h-[36px] flex justify-center items-center rounded-md bg-[#FFF] border-[1px] border-solid border-[#E4E4E7]">
        <ChevronLeft color="#18181B" />
      </button>
      <div>
        <p className="text-[#09090B] text-[24px] font-bold tracking-[-0.6px]">
          Create Your Account
        </p>
        <p className="text-[#71717A] text-[16px] ">
          Sign up to explore your favorite dishes.
        </p>
      </div>
      <Input placeholder="Enter your email" className="py-[8px] px-[12px]" />
      <Button onClick={clickHandler}>Lets Go</Button>
      <div className="flex gap-3">
        <p className="text-[#71717A] text-4">Already have an account?</p>
        <a href="#" className="text-[#2563EB] text-4">
          Log in
        </a>
      </div>
    </div>
  );
};

export default FirstStep;
