"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

const CloudinaryUpload = ({
  handleFile,
  field,
}: {
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
  field: ControllerRenderProps<
    {
      foodName: string;
      foodPrice: string;
      Ingredients: string;
      img: string;
    },
    "img"
  >;
}) => {
  const PRESENT_NAME = "food-delivery";
  const CLOUDINARY_NAME = "728498412411343";

  const handleUpload = async (file: File | null) => {
    if (!file) {
      alert("PLease Select a File");
      return;
    }
    console.log("ajilj ehellee");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESENT_NAME);
    formData.append("api_key", CLOUDINARY_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      return result.secure_url;
    } catch (err) {
      console.log(err);
      alert("failed to upload file");
    }
  };

  return (
    <div className="flex flex-col">
      <input type="file" onChange={handleFile} />
      {image && (
        <div>
          <Image src={image} alt="uploaded Photo" width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
