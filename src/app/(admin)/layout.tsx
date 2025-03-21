"use client";
import React, { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import { useUser } from "../_context/UsersContext";
type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  const { user } = useUser();
  if (!user) {
    return <div>Burtguulne uu</div>;
  } else if (user.role == "ADMIN") {
    return (
      <div className="flex">
        <Sidebar />
        {props.children}
      </div>
    );
  }
};

export default Authlayout;
