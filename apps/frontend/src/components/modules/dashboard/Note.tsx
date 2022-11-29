import Link from "next/link";
import React from "react";
import { DashboardRoutes, INote } from "shared";
import { twMerge } from "tailwind-merge";
import { Typography } from "ui";

interface Props extends React.HTMLProps<HTMLDivElement> {
  note: Pick<INote, "id" | "name" | "categories">;
}

export const Note: React.FC<Props> = (props) => {
  const { note, className, ...rest } = props;

  return (
    <article
      {...rest}
      className={twMerge(
        "relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 group overflow-hidden",
        className
      )}
    >
      <Typography
        text={note.name}
        className="transition-colors group-hover:text-blue-700"
      />

      <ul className="mt-4 flex gap-2 flex-wrap">
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
      <Link
        href={DashboardRoutes.Note + note.id}
        className="absolute top-0 right-0 bottom-0 left-0"
      />
    </article>
  );
};
