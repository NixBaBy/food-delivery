import Image from "next/image";
import React, { ReactNode } from "react";
import Header from "./components/Header";
type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default Authlayout;
