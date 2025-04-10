"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React from "react";
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

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const resetPassword = async (password: string) => {
    try {
      await fetch(
        "https://food-deliveryservice.onrender.com/auth/reset-password",
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

  const formSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: "Нууц үг нь дор хаяж 8 тэмдэгт байх ёстой." })
        .refine((password) => /[A-Z]/.test(password), {
          message: "Нууц үг нь том үсэг агуулсан байх ёстой.",
        })
        .refine((password) => /[a-z]/.test(password), {
          message: "Нууц үг нь жижиг үсэг агуулсан байх ёстой.",
        })
        .refine((password) => /[0-9]/.test(password), {
          message: "Нууц үг нь тоо агуулсан байх ёстой.",
        }),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Нууц үг таарахгүй байна.",
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
  const buttonHandler = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-6 w-[480px]">
      <Button size="icon" variant="outline" onClick={buttonHandler}>
        <ChevronLeft color="#18181B" />
      </Button>
      <div>
        <p className="text-[#09090B] text-[24px] font-bold tracking-[-0.6px]">
          Шинэ нууц үг үүсгэх
        </p>
        <p className="text-[#71717A] text-[16px]">
          Илүү аюулгүй байдлын тулд үсэг болон тоог хослуулсан шинэ нууц үг
          үүсгэнэ үү.
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
                  <Input placeholder="Нууц үг" {...field} type="password" />
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
                  <Input
                    placeholder="Нууц үгийг баталгаажуулах"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Илгээх
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
