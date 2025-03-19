"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React, { Dispatch } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";

const SecondStep = ({
  setCurrentStep,
  currentStep,
  user,
}: {
  setUser: Dispatch<string>;
  user: string;
  setCurrentStep: any;
  currentStep: number;
}) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const resetPassword = async (password: string) => {
    try {
      const response = await fetch(
        "http://localhost:8080/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, token }),
        }
      );

      alert("Нууц үг амжилттай солигдлоо!");
    } catch (error) {
      console.error("Алдаа:", error);
      alert("Алдаа гарлаа!");
    }
  };

  const router = useRouter();
  const formSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .refine((password) => /[A-Z]/.test(password), {
          message: "Password must include at least one uppercase letter.",
        })
        .refine((password) => /[a-z]/.test(password), {
          message: "Password must include at least one lowercase letter.",
        })
        .refine((password) => /[0-9]/.test(password), {
          message: "Password must include at least one number.",
        }),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords do not match.",
      path: ["confirm"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    resetPassword(values.password);
  }

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
          Create new password
        </p>
        <p className="text-[#71717A] text-[16px]">
          Set a new password with a combination of letters and numbers for
          better security.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="confirm" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SecondStep;
