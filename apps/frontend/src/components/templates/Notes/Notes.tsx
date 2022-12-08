import React from "react";
import { useTranslation } from "react-i18next";
import { Note } from "shared";
import { twMerge } from "tailwind-merge";
import { Typography } from "ui";

import { NoteItem } from "@/components/modules/dashboard/NoteItem";
import { SearchInput } from "@/components/modules/dashboard/SearchInput";

interface Props extends React.HTMLProps<HTMLDivElement> {
  notes?: Note[];
  deleteHandler: (id: string) => Promise<void>;
  setSearch: (value: string) => void;
}

export const NotesTemplate: React.FC<Props> = (props) => {
  const { setSearch, deleteHandler, notes, className, ...rest } = props;
  const { t } = useTranslation("page-notes");

  return (
    <div {...rest} className={twMerge(className)}>
      <div className="flex gap-4 justify-between items-center flex-wrap">
        <div>
          <Typography tag="h1" styling="h1" text={t("title") || ""} />
          <Typography tag="p" styling="p" text={t("subtitle") || ""} />
        </div>
        <SearchInput
          searchHandler={setSearch}
          className="w-full md:w-96 max-w-full"
        />
      </div>
      {notes && (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {notes.map((item) => (
            <li key={item.id}>
              <NoteItem
                note={item}
                deleteHandler={() => deleteHandler(item.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
