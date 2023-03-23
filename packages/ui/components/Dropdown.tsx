import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type DropdownPosition = "top" | "right" | "bottom" | "left";

interface Props<Item> extends React.HTMLProps<HTMLDivElement> {
  name: string;
  position?: DropdownPosition;
  items: Item[];
  renderItem: (item: Item) => React.ReactNode;
}

export const Dropdown = <Item,>(props: Props<Item>) => {
  const {
    name,
    position = "bottom",
    items,
    renderItem,
    className,
    children,
    ...rest
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const positions: Record<DropdownPosition, string> = {
    bottom: "top-full left-1/2 -translate-x-1/2 translate-y-3",
    left: "right-full top-1/2 -translate-x-3 -translate-y-1/2",
    right: "left-full top-1/2 translate-x-3 -translate-y-1/2",
    top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-3",
  };

  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => {
      if (evt.key !== "Escape") return;

      setIsOpen((value) => {
        if (!value) return value;

        return false;
      });
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  return (
    <div {...rest} className={twMerge("relative inline-flex", className)}>
      <button
        id={name}
        type="button"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setIsOpen((value) => !value)}
      >
        {children}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={twMerge("absolute z-30 w-44", positions[position])}
        >
          <ul
            className="py-1 text-sm border border-gray-100 text-gray-700 dark:text-gray-200 divide-y divide-gray-100 bg-white dark:bg-gray-700 rounded shadow"
            aria-labelledby={name}
          >
            {items.map((item, index) => (
              <li key={index} onClick={() => setIsOpen(false)}>
                {renderItem(item)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
