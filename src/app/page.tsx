import Image from "next/image";
import CloudinaryUpload from "./(admin)/admin/components/CloudinaryUpload";
import Authlayout from "./(main)/layout";
import Categorys from "@/app/(main)/components/Categorys";
import Foods from "@/app/(main)/components/Foods";

export default function Home() {
  return (
    <div className="bg-[#404040]">
      <Authlayout>
        <div
          style={{
            backgroundImage: `url("https://res.cloudinary.com/dhvtog3m2/image/upload/v1739972500/a0g2m0njixoflsowgo8f.png")`,
          }}
          className="w-full h-[570px] bg-cover bg-center"
        ></div>
        <Categorys />
      </Authlayout>
    </div>
  );
}
