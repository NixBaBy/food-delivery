"use client";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { Dispatch } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const ForgetFirstStep = ({
  setCurrentStep,
  currentStep,
  setEmail,
  resetPasswordRequest,
}: {
  setCurrentStep: Dispatch<number>;
  currentStep: number;
  setEmail: Dispatch<string>;
  resetPasswordRequest: (_email: string) => void;
}) => {
  const formSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    resetPasswordRequest(values.email);
    setEmail(values.email);
    setCurrentStep(currentStep + 1);
  }
  return (
    <div className="flex flex-col gap-6 w-[480px]">
      <Link href="login">
        <button className="w-[36px] h-[36px] flex justify-center items-center rounded-md bg-[#FFF] border-[1px] border-solid border-[#E4E4E7]">
          <ChevronLeft color="#18181B" />
        </button>
      </Link>
      <div>
        <p className="text-[#09090B] text-[24px] font-bold tracking-[-0.6px]">
          Reset your Password
        </p>
        <p className="text-[#71717A] text-[16px] ">
          Enter your email to receive a password reset link.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-[100%]">
            Send link
          </Button>
        </form>
      </Form>
      <div className="flex gap-3">
        <p className="text-[#71717A] text-4">Don’t have an account?</p>
        <a href="/sign-up" className="text-[#2563EB] text-4">
          sign Up
        </a>
      </div>
    </div>
  );
};

export default ForgetFirstStep;
