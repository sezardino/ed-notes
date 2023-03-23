import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { DashboardRoutes, Note } from "shared";
import { twMerge } from "tailwind-merge";
import { Dropdown, Icon, Typography } from "ui";

import { CategoryList } from "./CategoryList";

interface Props extends React.HTMLProps<HTMLDivElement> {
  note: Pick<Note, "id" | "name" | "categories">;
}

export const NoteItem: React.FC<Props> = (props) => {
  const { note, className, ...rest } = props;
  const { t } = useTranslation("component-note-item");
  const router = useRouter();

  const dropdownItems = [
    {
      label: t("show"),
      onClick: () => router.push(DashboardRoutes.Note + note.id),
    },
    {
      label: t("edit"),
      onClick: () => router.push(DashboardRoutes.EditNote(note.id)),
    },
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
        <div className="flex justify-between items-start">
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

        {!!note.categories.length && (
          <CategoryList categories={note.categories} />
        )}
      </article>
    </>
  );
};
