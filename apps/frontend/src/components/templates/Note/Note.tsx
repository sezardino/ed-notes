import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DashboardRoutes, INote } from "shared";
import { twMerge } from "tailwind-merge";
import { Button, Typography } from "ui";

import { DeleteNoteModal } from "@/components/modules/dashboard/DeleteNoteModal";

import styles from "./Note.module.css";

interface Props extends React.HTMLProps<HTMLDivElement> {
  note?: INote;
  deleteHandler: () => Promise<void>;
}

export const NoteTemplate: React.FC<Props> = (props) => {
  const { deleteHandler, note, className, ...rest } = props;
  const { t } = useTranslation("note");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!note) return null;

  const hasCategories = Boolean(note.categories.length);

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
    <>
      <div {...rest} className={twMerge(className)}>
        <header className="flex flex-wrap gap-5 justify-between items-center">
          <Typography tag="h1" styling="h1" text={note.name} />

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="xs"
              text={t("edit")}
              href={DashboardRoutes.EditNote(note.id)}
            />
            <Button
              size="xs"
              variant="alternative"
              text={t("change-visibility")}
            />
            <Button
              size="xs"
              variant="red"
              text={t("delete")}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </header>

        {hasCategories && categoriesInner}

        <hr className="mt-5" />

        <article
          className={twMerge(styles.body, "mt-10")}
          dangerouslySetInnerHTML={{ __html: note.body }}
        />
      </div>
      <DeleteNoteModal
        isOpen={isModalOpen}
        closeHandler={() => setIsModalOpen(false)}
        confirmHandler={deleteHandler}
      />
    </>
  );
};
