import React from "react";
import { useTranslation } from "react-i18next";
import { INote } from "shared";
import { twMerge } from "tailwind-merge";
import { Button, Typography } from "ui";

import styles from "./Note.module.css";

interface Props extends React.HTMLProps<HTMLDivElement> {
  note: Pick<INote, "body" | "categories" | "name">;
}

export const NoteTemplate: React.FC<Props> = (props) => {
  const { note, className, ...rest } = props;
  const hasCategories = Boolean(note.categories.length);
  const { t } = useTranslation("note");

  const categoriesInner = (
    <div className="mt-5">
      <Typography tag="h3" styling="h5" text={t("categories") || ""} />
      <ul className="mt-2 flex flex-wrap gap-2">
        {note.categories.map((category) => (
          <li
            key={category}
            className="flex py-1 px-2 rounded-lg dark:bg-gray-50 bg-gray-900"
          >
            <Typography
              tag="span"
              styling="capture"
              text={category}
              className="text-white dark:text-black"
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div {...rest} className={twMerge(className)}>
      <header className="flex flex-wrap gap-5 justify-between items-center">
        <Typography tag="h1" styling="h1" text={note.name} />

        <div className="flex items-center gap-2">
          <Button size="xs" text={t("edit")} />
          <Button
            size="xs"
            variant="alternative"
            text={t("change-visibility")}
          />
          <Button size="xs" variant="red" text={t("delete")} />
        </div>
      </header>

      {hasCategories && categoriesInner}

      <hr className="mt-5" />

      <article
        className={twMerge(styles.body, "mt-10")}
        dangerouslySetInnerHTML={{ __html: note.body }}
      />
    </div>
  );
};
