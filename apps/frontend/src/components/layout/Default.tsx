import React from "react";

import { Header } from "@/components/ui/Header";

interface Props extends React.HTMLProps<HTMLDivElement> {}

export const DefaultLayout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <div className="container mx-auto mt-5">{children}</div>
    </>
  );
};
