import React from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "ui";

interface Props extends React.HTMLProps<HTMLUListElement> {
  categories: string[];
}

export const CategoryList: React.FC<Props> = (props) => {
  const { categories, className, ...rest } = props;

  return (
    <ul {...rest} className={twMerge("flex gap-2 flex-wrap", className)}>
      {categories.map((category, index) => (
        <li
          key={`${category}-${index}`}
          className="py-1 px-2  bg-gray-800 rounded-lg shadow dark:bg-white"
        >
          <Typography
            text={category}
            styling="capture"
            className="text-white dark:text-black"
          />
        </li>
      ))}
    </ul>
  );
};
