import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AuthInput,
  AuthRoutes,
  PASSWORD_MIN_LENGTH,
  SignUpFormBody,
} from "shared";
import { twMerge } from "tailwind-merge";
import { Button, FormField, Typography } from "ui";

interface Props {
  signUpHandler: (dto: AuthInput, cb: () => void) => Promise<void>;
}

export const SignUp: React.FC<Props> = (props) => {
  const { signUpHandler } = props;
  const { t } = useTranslation("page-sign-up");

  const { register, handleSubmit, formState, reset, watch } =
    useForm<SignUpFormBody>();

  const onSubmit = handleSubmit(async (data) => {
    await signUpHandler(data, reset);
  });

  return (
    <>
      <Typography tag="h1" styling="h4">
        {t("title")}
      </Typography>
      <form className={twMerge("grid gap-1")} onSubmit={onSubmit}>
        <FormField
          {...register("email", {
            required: t("email.required") || "",
          })}
          label={t("email.label")}
          type="email"
          placeholder={t("email.placeholder") || ""}
          error={formState.errors.username?.message}
        />
        <FormField
          {...register("username")}
          label={t("username.label")}
          type="text"
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

        {/* TODO: uncomment when backend will be ready for not remember */}
        {/* <div className="flex items-center justify-between">
              <Toggle label={t("remember")} />
            </div>
        */}

        <Button type="submit" text={t("button")} className="w-full mt-4" />
      </form>
      <Typography styling="p" className="mt-4">
        {t("cta.text")}{" "}
        <Button text={t("cta.link")} variant="link" href={AuthRoutes.SingIn} />
      </Typography>
    </>
  );
};
