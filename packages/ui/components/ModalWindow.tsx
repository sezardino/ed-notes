import React from "react";
import { twMerge } from "tailwind-merge";

type ModalSizes = "sm" | "default" | "lg" | "xl";
interface Props extends React.HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  closeHandler: () => void;
  sizing?: ModalSizes;
}

export const ModalWindow: React.FC<Props> = (props) => {
  const {
    sizing = "default",
    closeHandler,
    isOpen,
    className,
    children,
    ...rest
  } = props;

  if (!isOpen) return null;

  const sizes: Record<ModalSizes, string> = {
    sm: "max-w-md",
    default: "max-w-lg",
    lg: "max-w-4xl",
    xl: "max-w-7xl",
  };

  const onWindowClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    evt.stopPropagation();

  return (
    <div
      {...rest}
      tabIndex={-1}
      className={twMerge(
        "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 md:inset-0 h-modal md:h-full flex justify-center items-center bg-black bg-opacity-80",
        isOpen ? "" : "hidden",
        className
      )}
      onClick={closeHandler}
    >
      <div
        className={twMerge("relative w-full h-full md:h-auto", sizes[sizing])}
        onClick={onWindowClick}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="popup-modal"
            onClick={closeHandler}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};
