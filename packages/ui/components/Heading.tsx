import React from "react";
import { twMerge } from "tailwind-merge";

type HeadingLevels = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface Props extends React.HTMLProps<HTMLDivElement> {
  level?: HeadingLevels;
  tag?: HeadingTags;
}

export const Heading: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  const levelStyles: Record<HeadingLevels, string> = {
    h1: "text-5xl font-extrabold dark:text-white",
    h2: "text-4xl font-bold dark:text-white",
    h3: "text-3xl font-bold dark:text-white",
    h4: "text-2xl font-bold dark:text-white",
    h5: "text-xl font-bold dark:text-white",
    h6: "text-lg font-bold dark:text-white",
  };

  return <div {...rest} className={twMerge(className)}></div>;
};
