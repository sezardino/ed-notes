import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ICreateNoteDto, ICreateNoteForm } from "shared";
import { twMerge } from "tailwind-merge";
import { Button, FormField, Toggle, Typography } from "ui";

const Editor = dynamic(() => import("ui/components/Editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface Props extends React.HTMLProps<HTMLDivElement> {
  onCreateNote: (dto: ICreateNoteDto) => void;
}

export const CreateNote: React.FC<Props> = (props) => {
  const { onCreateNote, className, ...rest } = props;
  const [body, setBody] = useState("");
  const { register, handleSubmit, formState, reset } =
    useForm<ICreateNoteForm>();
  const { t } = useTranslation("create-note");

  const onSubmit = handleSubmit((data) => {
    try {
      const categories = data.categories.trim().split(" ").filter(Boolean);

      onCreateNote({
        ...data,
        body,
        categories,
      });
      reset();
      setBody("");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div {...rest} className={twMerge(className)}>
      <section className="bg-white dark:bg-gray-900">
        <Typography styling="h3" text={t("title") || ""} />
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

          <Button size="xl" text="Add Note" className="mt-5" type="submit" />
        </form>
      </section>
    </div>
  );
};
