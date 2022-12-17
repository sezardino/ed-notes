import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CrudNoteFormBody, Note } from "shared";
import { twMerge } from "tailwind-merge";
import { Button, FormField, Toggle, Typography } from "ui";

import { checkUpdates } from "@/helpers";

const Editor = dynamic(() => import("ui/components/Editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface Props extends React.HTMLProps<HTMLDivElement> {
  note?: Note;
  onCrud: (dto: any) => Promise<void>;
}

export const CrudNote: React.FC<Props> = (props) => {
  const { onCrud, note, className, ...rest } = props;
  const [body, setBody] = useState(note?.body || "");
  const { register, handleSubmit, formState, reset } =
    useForm<CrudNoteFormBody>({
      defaultValues: {
        categories: note?.categories.join(" "),
        isPublic: note?.isPublic,
        name: note?.name,
      },
    });
  const isEdit = Boolean(note);
  const { t } = useTranslation("page-crud-note");

  const onSubmit = handleSubmit(async (data) => {
    try {
      const categories = data.categories.trim().split(" ").filter(Boolean);
      const content = { ...data, body, categories };

      const dto = note ? checkUpdates(note, content) : content;

      if (!Object.keys(dto).length) return;

      await onCrud(dto);

      reset();
      setBody("");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div {...rest} className={twMerge(className)}>
      <section className="bg-white dark:bg-gray-900">
        <Typography
          styling="h3"
          text={t(isEdit ? "edit-title" : "create-title") || ""}
        />
        <form className="mt-5" onSubmit={onSubmit}>
          <FormField
            {...register("name", { required: t("name.required") || "" })}
            label={t("name.label")}
            placeholder={t("name.placeholder") || ""}
            sizing="lg"
            error={formState.errors.name?.message}
          />

          <FormField
            {...register("categories")}
            label={t("categories.label")}
            placeholder={t("categories.placeholder") || ""}
            sizing="lg"
            error={formState.errors.categories?.message}
          />

          <Toggle {...register("isPublic")} label={t("is-public.label")} />

          <div>
            <Typography text={t("body.label") || ""} />
            <Editor
              value={body}
              onValueChange={setBody}
              placeholder={t("body.placeholder") || ""}
              className="mt-2"
            />
          </div>

          <Button
            size="xl"
            text={t(isEdit ? "edit-button" : "create-button")}
            className="mt-5"
            type="submit"
          />
        </form>
      </section>
    </div>
  );
};
