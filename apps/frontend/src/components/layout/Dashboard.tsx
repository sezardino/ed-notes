import React from "react";
import { twMerge } from "tailwind-merge";

import { Sidebar, SidebarLink } from "../modules/shared/Sidebar";
import { Header } from "../ui/Header";

const links: SidebarLink[] = [
  {
    label: "Notes",
    href: "#",
    icon: "MdOutlineStickyNote2",
  },
  {
    label: "Add Note",
    href: "#",
    icon: "MdOutlineNoteAdd",
  },
];

interface Props extends React.HTMLProps<HTMLDivElement> {}

export const DashboardLayout: React.FC<Props> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <div
      {...rest}
      className={twMerge("grid grid-rows-[auto_1fr] min-h-screen", className)}
    >
      <Header />
      <div className="h-full grid grid-cols-[auto_1fr]">
        <Sidebar links={links} />
        <main>{children}</main>
      </div>
    </div>
  );
};
