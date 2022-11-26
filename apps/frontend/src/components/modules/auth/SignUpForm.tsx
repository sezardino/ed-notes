import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { IAuthDto, ISignUpForm, PASSWORD_MIN_LENGTH } from "shared";
import { twMerge } from "tailwind-merge";
import { Button, FormField, Toggle } from "ui";

interface Props extends React.HTMLProps<HTMLFormElement> {
  submitHandler: (dto: IAuthDto) => void;
}

export const SignUpForm: React.FC<Props> = (props) => {
  const { submitHandler, className, ...rest } = props;
  const { t } = useTranslation();
  const { register, handleSubmit, formState, reset, watch } =
    useForm<ISignUpForm>();

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
          required: t("sign-up:username.required") || "",
        })}
        label={t("sign-up:username.label")}
        type="username"
        placeholder={t("sign-up:username.placeholder") || ""}
        error={formState.errors.username?.message}
      />
      <FormField
        {...register("password", {
          required: t("sign-up:password.required") || "",
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: t("sign-up:password.min", { min: PASSWORD_MIN_LENGTH }),
          },
        })}
        label={t("sign-up:password.label")}
        type="password"
        placeholder={t("sign-up:password.placeholder") || ""}
        error={formState.errors.password?.message}
      />
      <FormField
        {...register("repeatPassword", {
          required: t("sign-up:repeat-password.required") || "",
          validate: (val: string) => {
            if (watch("password") != val) {
              return t("sign-up:repeat-password.match") || "";
            }
          },
        })}
        label={t("sign-up:repeat-password.label")}
        type="password"
        placeholder={t("sign-up:repeat-password.placeholder") || ""}
        error={formState.errors.repeatPassword?.message}
      />

      <div className="flex items-center justify-between">
        <Toggle label={t("sign-up:remember")} />
      </div>

      <Button
        type="submit"
        text={t("sign-up:button")}
        className="w-full mt-4"
      />
    </form>
  );
};
