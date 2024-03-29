import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DashboardRoutes, Note } from "shared";
import { twMerge } from "tailwind-merge";
import { Button, ConfirmModal, Typography } from "ui";

import { CategoryList } from "@/components/modules/dashboard/CategoryList";
import { DeleteNoteModal } from "@/components/modules/dashboard/DeleteNoteModal";

import styles from "./Note.module.css";

interface Props extends React.HTMLProps<HTMLDivElement> {
  note?: Note;
  deleteHandler?: () => Promise<void>;
  changeVisibilityHandler?: () => Promise<void>;
}

export const NoteTemplate: React.FC<Props> = (props) => {
  const { changeVisibilityHandler, deleteHandler, note, className, ...rest } =
    props;
  const { t } = useTranslation("page-note");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);

  if (!note) return null;

  const isPublicRoute = changeVisibilityHandler && deleteHandler;

  const hasCategories = Boolean(note.categories.length);

  const categoriesInner = (
    <div className="mt-5">
      <Typography tag="h3" styling="h5" text={t("categories") || ""} />
      {!!note.categories.length && (
        <CategoryList categories={note.categories} className="mt-2" />
      )}
    </div>
  );

  return (
    <>
      <div {...rest} className={twMerge(className)}>
        <header className="flex flex-wrap gap-5 justify-between items-center">
          <Typography tag="h1" styling="h1" text={note.name} />
          {isPublicRoute && (
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="xs"
                text={t("edit")}
                href={DashboardRoutes.EditNote(note.id)}
              />
              <Button
                size="xs"
                variant="alternative"
                text={t(
                  `change-visibility.trigger-${
                    note.isPublic ? "" : "not-"
                  }public`
                )}
                onClick={() => setIsVisibilityModalOpen(true)}
              />
              <Button
                size="xs"
                variant="red"
                text={t("delete")}
                onClick={() => setIsDeleteModalOpen(true)}
              />
            </div>
          )}
        </header>

        {hasCategories && categoriesInner}

        <hr className="mt-5" />

        <article
          className={twMerge(styles.body, "mt-10")}
          dangerouslySetInnerHTML={{ __html: note.body }}
        />
      </div>

      {isPublicRoute && (
        <>
          <DeleteNoteModal
            isOpen={isDeleteModalOpen}
            closeHandler={() => setIsDeleteModalOpen(false)}
            confirmHandler={deleteHandler}
          />

          <ConfirmModal
            isOpen={isVisibilityModalOpen}
            closeHandler={() => setIsVisibilityModalOpen(false)}
            confirmHandler={changeVisibilityHandler}
            title={t("change-visibility.title")}
            info={t(
              `change-visibility.info-${note.isPublic ? "" : "not-"}public`
            )}
            declineButton={{ text: t("change-visibility.decline") }}
            confirmButton={{
              text: t(
                `change-visibility.confirm-${note.isPublic ? "" : "not-"}public`
              ),
            }}
          />
        </>
      )}
    </>
  );
};
