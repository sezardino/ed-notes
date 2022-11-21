import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLProps<HTMLTextAreaElement> {}

export const Textarea: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <textarea
      {...rest}
      rows={4}
      className={twMerge(
        "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
      )}
    />
  );
};
