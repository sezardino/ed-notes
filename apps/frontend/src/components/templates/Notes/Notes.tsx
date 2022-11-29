import React from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { Typography } from "ui";

import { Note } from "@/components/modules/dashboard/Note";
import { SearchInput } from "@/components/modules/dashboard/SearchInput";

interface Props extends React.HTMLProps<HTMLDivElement> {}

const mockNotes = [
  { name: "Create something", id: "dwdwd", categories: ["sport", "relations"] },
  {
    name: "Create something",
    id: "dwdwwd",
    categories: ["sport", "relations"],
  },
  {
    name: "Create something",
    id: "dawdwd",
    categories: ["sport", "relations"],
  },
  {
    name: "Create something",
    id: "dswdwd",
    categories: ["sport", "relations"],
  },
  {
    name: "Create something",
    id: "dwadwd",
    categories: ["sport", "relations"],
  },
];

export const NotesTemplate: React.FC<Props> = (props) => {
  const { className, ...rest } = props;
  const { t } = useTranslation("notes");

  const searchHandler = async () => console.log("search");

  return (
    <div {...rest} className={twMerge(className)}>
      <div className="flex gap-4 justify-between items-center flex-wrap">
        <div>
          <Typography tag="h1" styling="h1" text={t("title") || ""} />
          <Typography tag="p" styling="p" text={t("subtitle") || ""} />
        </div>
        <SearchInput
          searchHandler={searchHandler}
          className="w-full md:w-96 max-w-full"
        />
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr));]">
        {mockNotes.map((item) => (
          <li key={item.id}>
            <Note note={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
