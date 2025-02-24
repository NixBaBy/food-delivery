import React, { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      {props.children}
    </div>
  );
};

export default Authlayout;
