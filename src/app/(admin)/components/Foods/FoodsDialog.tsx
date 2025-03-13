import React, { ChangeEvent, useState } from "react";
import CloudinaryUpload from "../CloudinaryUpload";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  img: z.string().min(0, {
    message: "zurag oruulna uu",
  }),
  foodName: z.string().min(2, {
    message: "ner 2usegnees deesh baina",
  }),
  foodPrice: z.string().min(1, {
    message: "une 1ees ih baina",
  }),
  Ingredients: z.string().min(5, {
    message: "tailbat dor hayj 5useg",
  }),
});

const FoodsDialog = ({ getData, id }: { getData: () => void; id: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files[0];
    if (files) {
      setFile(files);
      const tempImageUrl = URL.createObjectURL(files);
      setImage(tempImageUrl);
    }
  };

  const createFood = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch("http://localhost:8080/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, category: id }),
      });
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
    getData();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      img: "",
      foodName: "",
      foodPrice: "",
      Ingredients: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    alert("amjilttai nemlee");
    createFood(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="py-2 px-4 flex flex-col justify-center items-center gap-6 border-dashed border-[1px] border-red-500 rounded-[20px] h-[241px] w-[249px] cursor-pointer">
          <div className="w-[36px] h-[36px] py-2 px-4 flex justify-center items-center bg-[#EF4444] rounded-full text-white">
            +
          </div>
          <p className="text-[14px] font-bold w-[154px] text-center">
            Add new Dish to Appeziters
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[460px] p-6 rounded-xl bg-[#FFF]">
        <DialogTitle>
          <p className="text-[18px] font-bold">Add new Dish to Appetizers</p>
        </DialogTitle>
        <div className="flex flex-col gap-[24px] ">
          <div className="flex gap-[24px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="foodName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Food Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <div className="flex flex-col gap-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="foodPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Food Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="Ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredients</FormLabel>
                      <FormControl>
                        <Input placeholder="tailbar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="img"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Food image</FormLabel>
                      <FormControl>
                        <CloudinaryUpload
                          handleFile={handleFile}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodsDialog;
