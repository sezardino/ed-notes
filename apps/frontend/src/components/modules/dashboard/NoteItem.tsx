import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DashboardRoutes, Note } from "shared";
import { twMerge } from "tailwind-merge";
import { Dropdown, Icon, Typography } from "ui";

import { DeleteNoteModal } from "./DeleteNoteModal";

interface Props extends React.HTMLProps<HTMLDivElement> {
  note: Pick<Note, "id" | "name" | "categories">;
  deleteHandler: () => Promise<void>;
}

export const NoteItem: React.FC<Props> = (props) => {
  const { deleteHandler, note, className, ...rest } = props;
  const { t } = useTranslation("component-note-item");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const dropdownItems = [
    {
      label: t("show"),
      onClick: () => router.push(DashboardRoutes.EditNote(note.id)),
    },
    {
      label: t("edit"),
      onClick: () => router.push(DashboardRoutes.Note + note.id),
    },
    { label: t("delete"), onClick: () => setIsModalOpen(true) },
  ];

  return (
    <>
      <article
        {...rest}
        className={twMerge(
          "flex flex-col gap-5 justify-between relative h-full p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5",
          className
        )}
      >
        <div className="flex justify-between items-center">
          <Link href={DashboardRoutes.Note + note.id} className="group">
            <Typography
              text={note.name}
              styling="h5"
              className="transition-colors group-hover:text-blue-700"
            />
          </Link>
          <Dropdown
            name="note-dropdown"
            items={dropdownItems}
            renderItem={(item) => (
              <button
                className="w-full text-left p-0.5 hover:text-blue-300 text-black dark:text-white"
                onClick={item.onClick}
              >
                <Typography
                  tag="span"
                  styling="h6"
                  className="px-2 py-1 text-inherit dark:text-inherit"
                >
                  {item.label}
                </Typography>
              </button>
            )}
          >
            <Icon name="MdMoreVert" size={24} />
          </Dropdown>
        </div>

        <ul className="flex gap-2 flex-wrap">
          {note.categories.map((category) => (
            <li
              key={category}
              className="py-0.5 px-1  bg-gray-800 rounded-lg shadow dark:bg-white"
            >
              <Typography
                text={category}
                styling="capture"
                className="text-white dark:text-black"
              />
            </li>
          ))}
        </ul>
      </article>
      <DeleteNoteModal
        isOpen={isModalOpen}
        closeHandler={() => setIsModalOpen(false)}
        confirmHandler={deleteHandler}
      />
    </>
  );
};
