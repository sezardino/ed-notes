import React from "react";
import { twMerge } from "tailwind-merge";

type TypographyStyling =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "leading"
  | "capture";
type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
type TypographyVariant = "default" | "light";

interface Props extends React.HTMLProps<HTMLDivElement> {
  styling?: TypographyStyling;
  variant?: "default" | "light";
  tag?: TypographyTag;
  text?: string;
}

export const Typography: React.FC<Props> = (props) => {
  const {
    styling = "p",
    tag = "p",
    variant = "default",
    text,
    children,
    className,
    ...rest
  } = props;

  const Tag = tag;

  const variants: Record<TypographyVariant, string> = {
    default: "text-black dark:text-white",
    light: "text-gray-500 dark:text-gray-400",
  };

  const styles: Record<TypographyStyling, string> = {
    h1: "text-5xl font-extrabold",
    h2: "text-4xl font-bold",
    h3: "text-3xl font-bold",
    h4: "text-2xl font-bold",
    h5: "text-xl font-bold",
    h6: "text-lg font-bold",
    p: "font-light",
    leading: "text-lg font-light md:text-xl",
    capture: "text-xs",
  };

  return (
    <Tag
      {...rest}
      className={twMerge(variants[variant], styles[styling], className)}
    >
      {children ? children : text}
    </Tag>
  );
};
