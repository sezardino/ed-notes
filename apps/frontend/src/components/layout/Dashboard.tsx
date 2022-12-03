import React from "react";
import { DashboardRoutes } from "shared";
import { twMerge } from "tailwind-merge";

import { Header } from "../ui/Header";
import { Sidebar, SidebarLink } from "../ui/Sidebar";

const links: SidebarLink[] = [
  {
    label: "Dashboard",
    href: DashboardRoutes.Dashboard,
    icon: "MdDashboard",
  },
  {
    label: "Notes",
    href: DashboardRoutes.Notes,
    icon: "MdOutlineNote",
  },
  {
    label: "Add Note",
    href: DashboardRoutes.AddNote,
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
      <Header isDashboard />
      <div className="h-full grid sm:grid-cols-[auto_1fr]">
        <Sidebar links={links} />
        <main className="w-full max-w-7xl px-5 py-10 sm:px-12 sm:py-16">
          {children}
        </main>
      </div>
    </div>
  );
};
