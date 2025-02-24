"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

const CloudinaryUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState(null);

  const PRESENT_NAME = "food-delivery";
  const CLOUDINARY_NAME = "728498412411343";

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files[0];
    if (files) {
      setFile(files);
    }
  };

  const handleUpload = async () => {
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
      const data = await res.json();
      setImage(data.secure_url);
    } catch (err) {
      console.log(err);
      alert("failed to upload file");
    }
  };

  return (
    <div className="flex flex-col">
      <input type="file" onChange={handleFile} />
      <Button onClick={handleUpload}>Upload</Button>
      {image && (
        <div>
          <Image src={image} alt="uploaded Photo" width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
