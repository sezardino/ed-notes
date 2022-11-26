import React from "react";
import { twMerge } from "tailwind-merge";

export type InputSizing = "sm" | "base" | "lg";

interface Props extends React.HTMLProps<HTMLInputElement> {
  sizing?: InputSizing;
}

const InputComponent = (props: Props, ref: any) => {
  const { sizing = "base", className, ...rest } = props;

  const commonStyles =
    "block w-full text-gray-900 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  const sizes: Record<InputSizing, string> = {
    sm: "p-2 border sm:text-xs",
    base: "border text-sm p-2.5",
    lg: "p-4 border sm:text-md",
  };

  return (
    <input
      ref={ref}
      {...rest}
      className={twMerge(commonStyles, sizes[sizing], className)}
    />
  );
};

export const Input = React.forwardRef(InputComponent);
