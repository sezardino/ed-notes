import React, { useState } from "react";
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

  const positions: Record<DropdownPosition, string> = {
    bottom: "top-full left-1/2 -translate-x-1/2 translate-y-3",
    left: "right-full top-1/2 -translate-x-3 -translate-y-1/2",
    right: "left-full top-1/2 translate-x-3 -translate-y-1/2",
    top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-3",
  };

  return (
    <div {...rest} className={twMerge("relative inline-flex", className)}>
      <div id={name} tabIndex={0} onClick={() => setIsOpen((value) => !value)}>
        {children}
      </div>
      {isOpen && (
        <div
          className={twMerge(
            "absolute z-20 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 top-full left-1/2 -translate-x-1/2 translate-y-3",
            positions[position]
          )}
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby={name}
          >
            {items.map((item, index) => (
              <li key={index}>{renderItem(item)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
