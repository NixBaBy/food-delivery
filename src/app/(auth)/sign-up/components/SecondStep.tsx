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
import { useRouter } from "next/navigation";

const SecondStep = ({
  setCurrentStep,
  currentStep,
  user,
  setUser,
}: {
  setUser: Dispatch<string>;
  user: string;
  setCurrentStep: any;
  currentStep: number;
}) => {
  const createUser = async (password: string, user: string) => {
    try {
      const response = await fetch("http://localhost:8080/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
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
    createUser(values.password, user);
    router.push("/login");
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
          Create a strong password
        </p>
        <p className="text-[#71717A] text-[16px] ">
          Create a strong password with letters, numbers.
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
        </form>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
      <div className="flex gap-3">
        <p className="text-[#71717A] text-4">Already have an account?</p>
        <a href="login" className="text-[#2563EB] text-4">
          Log in
        </a>
      </div>
    </div>
  );
};

export default SecondStep;
