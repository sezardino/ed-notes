import React from "react";
import { useTranslation } from "react-i18next";
import { INote } from "shared";
import { twMerge } from "tailwind-merge";
import { Typography } from "ui";

import { NoteItem } from "@/components/modules/dashboard/NoteItem";
import { SearchInput } from "@/components/modules/dashboard/SearchInput";

interface Props extends React.HTMLProps<HTMLDivElement> {
  notes?: INote[];
}

export const NotesTemplate: React.FC<Props> = (props) => {
  const { notes, className, ...rest } = props;
  const { t } = useTranslation("notes");

  const searchHandler = async () => console.log("search");
  console.log(notes);
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
      {notes && (
        <ul className="mt-10 grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr));]">
          {notes.map((item) => (
            <li key={item.id}>
              <NoteItem note={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
