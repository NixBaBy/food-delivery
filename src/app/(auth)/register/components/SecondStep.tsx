import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const SecondStep = ({
  setCurrentStep,
  currentStep,
}: {
  setCurrentStep: any;
  currentStep: number;
}) => {
  return (
    <div className="flex flex-col gap-6 w-[480px]">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        <ChevronLeft color="#18181B" />
      </Button>
      <div>
        <p className="text-[#09090B] text-[24px] font-bold tracking-[-0.6px]">
          Create a strong password
        </p>
        <p className="text-[#71717A] text-[16px] ">
          Create a strong password with letters, numbers.
        </p>
      </div>
      <Input placeholder="Password" className="py-[8px] px-[12px]" />
      <Input placeholder="Confirm" className="py-2 px4" />
      <Link href="login">
        <Button className="w-full px-[32px]">Lets Go</Button>
      </Link>
      <div className="flex gap-3">
        <p className="text-[#71717A] text-4">Already have an account?</p>
        <a href="#" className="text-[#2563EB] text-4">
          Log in
        </a>
      </div>
    </div>
  );
};

export default SecondStep;
