import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { Icon } from "ui";

interface Props extends React.HTMLProps<HTMLDivElement> {
  searchHandler: (value: string) => void;
}

export const SearchInput: React.FC<Props> = (props) => {
  const { searchHandler, className, ...rest } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation("page-notes");

  return (
    <div {...rest} className={twMerge(className)}>
      <label
        htmlFor="search-note"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        {t("search.notes")}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon name="MdSearch" size={20} />
        </div>
        <input
          ref={inputRef}
          type="search"
          id="search-note"
          className="block w-full p-4 pl-10 pr-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={t("search.placeholder") || ""}
          onChange={(evt) => searchHandler(evt.target.value)}
        />
      </div>
    </div>
  );
};
