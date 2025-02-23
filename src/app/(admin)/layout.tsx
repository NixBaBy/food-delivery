import React, { ReactNode } from "react";
import Sidebar from "./admin/components/Sidebar";
type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  return (
    <div>
      <Sidebar />
      {props.children}
    </div>
  );
};

export default Authlayout;
