import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { AuthInput, PASSWORD_MIN_LENGTH, SignUpFormBody } from "shared";
import { twMerge } from "tailwind-merge";
import { Button, FormField, Toggle } from "ui";

interface Props extends React.HTMLProps<HTMLFormElement> {
  submitHandler: (dto: AuthInput) => void;
}

export const SignUpForm: React.FC<Props> = (props) => {
  const { submitHandler, className, ...rest } = props;
  const { t } = useTranslation("page-sign-up");
  const { register, handleSubmit, formState, reset, watch } =
    useForm<SignUpFormBody>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await submitHandler(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form
      {...rest}
      className={twMerge("grid gap-1", className)}
      onSubmit={onSubmit}
    >
      <FormField
        {...register("username", {
          required: t("username.required") || "",
        })}
        label={t("username.label")}
        type="username"
        placeholder={t("username.placeholder") || ""}
        error={formState.errors.username?.message}
      />
      <FormField
        {...register("password", {
          required: t("password.required") || "",
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: t("password.min", { min: PASSWORD_MIN_LENGTH }),
          },
        })}
        label={t("password.label")}
        type="password"
        placeholder={t("password.placeholder") || ""}
        error={formState.errors.password?.message}
      />
      <FormField
        {...register("repeatPassword", {
          required: t("repeat-password.required") || "",
          validate: (val: string) => {
            if (watch("password") != val) {
              return t("repeat-password.match") || "";
            }
          },
        })}
        label={t("repeat-password.label")}
        type="password"
        placeholder={t("repeat-password.placeholder") || ""}
        error={formState.errors.repeatPassword?.message}
      />

      <div className="flex items-center justify-between">
        <Toggle label={t("remember")} />
      </div>

      <Button type="submit" text={t("button")} className="w-full mt-4" />
    </form>
  );
};
