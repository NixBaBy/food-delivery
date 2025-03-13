import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React, { Dispatch, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type user = {
  email: string;
  password: string;
};

const FirstStep = ({
  setCurrentStep,
  currentStep,
  user,
  setUser,
}: {
  setUser: Dispatch<string>;
  user: string;
  setCurrentStep: Dispatch<number>;
  currentStep: number;
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
    setUser(values.email);
    setCurrentStep(currentStep + 1);
  }

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Lets Go
          </Button>
        </form>
      </Form>
      <div className="flex gap-3">
        <p className="text-[#71717A] text-4">Already have an account?</p>
        <a href="/login" className="text-[#2563EB] text-4">
          Log in
        </a>
      </div>
    </div>
  );
};

export default FirstStep;
