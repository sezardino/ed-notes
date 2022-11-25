import React from "react";
import { twMerge } from "tailwind-merge";

import { Sidebar } from "../ui/Sidebar";

interface Props extends React.HTMLProps<HTMLDivElement> {}

export const DashboardLayout: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <div {...rest} className={twMerge(className)}>
      <Sidebar />
    </div>
  );
};
