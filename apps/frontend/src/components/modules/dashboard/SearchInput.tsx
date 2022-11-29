import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { Button, Icon } from "ui";

interface Props extends React.HTMLProps<HTMLFormElement> {
  searchHandler: (value: string) => Promise<void>;
}

export const SearchInput: React.FC<Props> = (props) => {
  const { searchHandler, className, ...rest } = props;
  const { register, handleSubmit } = useForm<{ search: string }>();
  const { t } = useTranslation("notes");

  const onSubmit = handleSubmit(async (data) => {
    try {
      await searchHandler(data.search);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form {...rest} className={twMerge(className)} onSubmit={onSubmit}>
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
          {...register("search", { required: true })}
          type="search"
          id="search-note"
          className="block w-full p-4 pl-10 pr-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={t("search.placeholder") || ""}
          required
        />
        <Button
          text={t("search.button")}
          size="xs"
          type="submit"
          className="absolute right-2.5 bottom-2.5"
        />
      </div>
    </form>
  );
};
