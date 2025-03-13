"use client";
import React, { useEffect, useState } from "react";
type Category = {
  _id: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Foods from "../components/Foods/AddFoods";

import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  category: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

const page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategoryName, setEditCategoryName] = useState<boolean>(false);
  const [isedit, setIsEdit] = useState<boolean>(false);
  const [saveId, setSaveId] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
    },
  });

  const getData = async () => {
    const res = await fetch(`http://localhost:8080/food-category`);
    const data = await res.json();
    setCategories(data.getCagegory);
  };
  useEffect(() => {
    getData();
  }, []);

  const createCategory = async (name: string) => {
    try {
      const response = await fetch("http://localhost:8080/food-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName: name }),
      });
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
    getData();
  };

  const deleteCategory = async (category: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/food-category/${category}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
    alert("amjilttai ustglaa");
    getData();
  };

  const editCategory = async (id: string, categoryName: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/food-category/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName }),
        }
      );
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
    getData();
  };

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (isedit) {
      editCategory(saveId, values.category);
    } else {
      createCategory(values.category);
    }
    alert("amjilttai uildel hiigdlee");
  }
  const handleClickEdit = (id: string) => {
    setEditCategoryName(true);
    setIsEdit(true);
    setSaveId(id);
  };
  const closeDiolog = () => {
    setEditCategoryName(false);
  };

  const handleClickAdd = () => {
    setEditCategoryName(true);
    setIsEdit(false);
  };

  return (
    <div className="bg-[#f4f4f5] w-screen  p-6">
      <div className="p-6  w-full m-auto  flex flex-col gap-[24px] ">
        <div className="flex flex-col bg-[#fff] p-5 rounded-xl  gap-4 ">
          <p className="text-[20px] font-bold tracking-[-0.5px]">
            Dishes category
          </p>
          <div className="flex gap-3 items-center flex-wrap ">
            {categories?.map((category: Category) => {
              return (
                <button
                  key={category._id}
                  className=" py-1 px-5 bg-white rounded-full"
                >
                  <ContextMenu>
                    <ContextMenuTrigger>
                      {category.categoryName}
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem
                        onClick={() => handleClickEdit(category._id)}
                      >
                        Edit
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => deleteCategory(category._id)}
                      >
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </button>
              );
            })}{" "}
            <div
              className="w-[36px] h-[36px] py-2 px-4 flex justify-center items-center bg-[#EF4444] rounded-full text-white"
              onClick={handleClickAdd}
            >
              +
            </div>
            <Dialog open={editCategoryName} onOpenChange={closeDiolog}>
              <DialogContent className="w-[460px] p-6 rounded-xl">
                <DialogHeader>
                  <DialogTitle>
                    {isedit ? "Edit category" : "Add new category"}
                  </DialogTitle>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="нэмэх утга аа оруулна уу"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Type category name
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Add Category</Button>
                    </form>
                  </Form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Foods categories={categories} />
      </div>
    </div>
  );
};

export default page;
