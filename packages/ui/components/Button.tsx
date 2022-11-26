import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant =
  | "primary"
  | "alternative"
  | "dark"
  | "light"
  | "green"
  | "red"
  | "yellow"
  | "link";

type ButtonSizes = "xs" | "sm" | "base" | "lg" | "xl";

interface Props {
  text: string;
  variant?: ButtonVariant;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  size?: ButtonSizes;
  href?: string;
  className?: string;
}

const ButtonComponent = (props: Props, ref: any) => {
  const {
    text,
    size = "base",
    type = "button",
    variant = "primary",
    href,
    className,
    ...rest
  } = props;

  const commonStyles = "font-medium rounded-lg focus:ring-4 focus:outline-none";

  const styles: Record<ButtonVariant, string> = {
    primary:
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    alternative:
      "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
    dark: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
    light:
      "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
    green:
      "text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
    red: "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    yellow:
      "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900",
    link: "font-medium text-blue-600 dark:text-blue-500 hover:underline hover:underline",
  };

  const sizes: Record<ButtonSizes, string> = {
    xs: "py-2 px-3 text-xs",
    sm: "py-2 px-3 text-sm",
    base: "py-2.5 px-5 text-sm",
    lg: "py-3 px-5 text-base",
    xl: "py-3.5 px-6 text-base",
  };

  const buttonStyles = twMerge(
    commonStyles,
    styles[variant],
    variant !== "link" && sizes[size],
    className
  );

  if (href) {
    return (
      <a ref={ref} {...rest} href={href} className={buttonStyles}>
        {text}
      </a>
    );
  }

  return (
    <button ref={ref} {...rest} type={type} className={buttonStyles}>
      {text}
    </button>
  );
};

export const Button = React.forwardRef(ButtonComponent);
