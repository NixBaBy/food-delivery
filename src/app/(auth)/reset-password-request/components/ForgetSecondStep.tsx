"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { Dispatch, useState } from "react";

import { Button } from "@/components/ui/button";

const ForgetFirstStep = ({
  email,
  resetPasswordRequest,
}: {
  setCurrentStep: Dispatch<number>;
  currentStep: number;
  email: string;
  resetPasswordRequest: (_email: string) => void;
}) => {
  const resendHandler = () => {
    resetPasswordRequest(email);
    alert("ahin ilgeele");
  };
  return (
    <div className="flex flex-col gap-6 w-[480px]">
      <Link href="login">
        <button className="w-[36px] h-[36px] flex justify-center items-center rounded-md bg-[#FFF] border-[1px] border-solid border-[#E4E4E7]">
          <ChevronLeft color="#18181B" />
        </button>
      </Link>
      <div>
        <p className="text-[#09090B] text-[24px] font-bold tracking-[-0.6px]">
          Please verify Your Email
        </p>
        <p className="text-[#71717A] text-[16px] ">
          We just sent an email to {email} Click the link in the email to verify
          your account.
        </p>
      </div>
      <Button className="w-[100%]" onClick={resendHandler}>
        Resend email
      </Button>
    </div>
  );
};

export default ForgetFirstStep;
