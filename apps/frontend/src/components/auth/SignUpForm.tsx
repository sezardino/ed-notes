import { useTranslation } from "next-i18next";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Button, InputField, Toggle } from "ui";

interface Props extends React.HTMLProps<HTMLFormElement> {}

export const SignUpForm: React.FC<Props> = (props) => {
  const { className, ...rest } = props;
  const { t } = useTranslation();

  return (
    <form {...rest} className={twMerge(className)}>
      <InputField
        label={t("sign-up:username.label")}
        type="email"
        placeholder={t("sign-up:username.placeholder") || ""}
        name="email"
      />
      <InputField
        label={t("sign-up:password.label")}
        type="password"
        placeholder={t("sign-up:password.placeholder") || ""}
        name="password"
      />
      <InputField
        label={t("sign-up:repeat-password.label")}
        type="password"
        placeholder={t("sign-up:repeat-password.placeholder") || ""}
        name="password"
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
