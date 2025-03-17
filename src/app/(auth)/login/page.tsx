"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
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
});

const Page = () => {
  const router = useRouter();

  const loginUser = async (user: string, password: string) => {
    const response = await fetch("http://localhost:8080/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      alert(data.message);
    } else if (data.user.role == "ADMIN") {
      router.push("/foodMenu");
    } else {
      router.push("/");
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    loginUser(values.email, values.password);
  }

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p>Forgat Password?</p>
          <Button type="submit" className="w-full">
            Lets go
          </Button>
        </form>
      </Form>
      <div className="flex gap-3">
        <p className="text-[#71717A] text-4">Don’t have an account?</p>
        <a href="sign-up" className="text-[#2563EB] text-4">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Page;
