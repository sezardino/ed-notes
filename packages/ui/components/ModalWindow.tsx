import { Icon } from "./Icon";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type ModalSizes = "sm" | "default" | "lg" | "xl";
export interface ModalProps extends React.HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  closeHandler: () => void;
  sizing?: ModalSizes;
}

export const ModalWindow: React.FC<ModalProps> = (props) => {
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

  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => {
      if (evt.key !== "Escape" || !isOpen) return;

      closeHandler();
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [isOpen]);

  return (
    <div
      {...rest}
      tabIndex={-1}
      className={twMerge(
        "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 md:inset-0 h-modal md:h-full flex justify-center items-center bg-black bg-opacity-80",
        isOpen ? "" : "hidden"
      )}
      onClick={closeHandler}
    >
      <div
        className={twMerge(
          "relative w-full h-full md:h-auto bg-white rounded-lg shadow dark:bg-gray-700 p-6",
          sizes[sizing],
          className
        )}
        onClick={onWindowClick}
      >
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="popup-modal"
          onClick={closeHandler}
        >
          <Icon name="MdClose" size={20} />
          <span className="sr-only">Close modal</span>
        </button>
        {children}
      </div>
    </div>
  );
};
