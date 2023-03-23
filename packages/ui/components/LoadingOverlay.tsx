import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLProps<HTMLDivElement> {}

export const LoadingOverlay: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      tabIndex={-1}
      className={twMerge(
        "fixed top-0 left-0 right-0 bottom-0 z-50 flex backdrop-blur-sm",
        className
      )}
    >
      <div role="status" className="m-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 100 101"
          className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 relative z-[1]"
        >
          <path
            fill="currentColor"
            d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919Z"
          />
          <path
            fill="currentFill"
            d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165Z"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
