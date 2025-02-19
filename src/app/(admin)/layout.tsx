import React, { ReactNode } from "react";
import Header from "../(main)/components/Header";
type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  return <div>{props.children}</div>;
};

export default Authlayout;
