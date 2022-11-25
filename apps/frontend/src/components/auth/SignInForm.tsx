import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { IAuthDto, ISignInForm, PASSWORD_MIN_LENGTH } from "shared";
import { twMerge } from "tailwind-merge";
import { Button, FormField, Toggle } from "ui";

interface Props extends React.HTMLProps<HTMLFormElement> {
  submitHandler: (dto: IAuthDto) => void;
}

export const SignInForm: React.FC<Props> = (props) => {
  const { submitHandler, className, ...rest } = props;
  const { t } = useTranslation();
  const { register, handleSubmit, formState, reset } = useForm<ISignInForm>();

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
          required: t("sign-in:username.required") || "",
        })}
        label={t("sign-in:username.label")}
        type="username"
        placeholder={t("sign-in:username.placeholder") || ""}
        error={formState.errors.username?.message}
      />
      <FormField
        {...register("password", {
          required: t("sign-in:password.required") || "",
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: t("sign-in:password.min", { min: PASSWORD_MIN_LENGTH }),
          },
        })}
        label={t("sign-in:password.label")}
        type="password"
        placeholder={t("sign-in:password.placeholder") || ""}
        error={formState.errors.password?.message}
      />

      <div className="mt-2 flex items-center justify-between">
        <Toggle label={t("sign-in:remember")} />
      </div>

      <Button
        type="submit"
        text={t("sign-in:button")}
        className="w-full mt-4"
      />
    </form>
  );
};
